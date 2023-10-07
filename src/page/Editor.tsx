import { readAs } from 'koajax';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { createRef, MouseEvent, PureComponent } from 'react';
import { blobOf, formatDate, uniqueID } from 'web-utility';
import YAML from 'yaml';

import { ListField } from '../component/JSONEditor';
import { MarkdownEditor } from '../component/MarkdownEditor';
import { GitContent, PathSelect } from '../component/PathSelect';
import { getCurrentUser, updateContent } from '../service';
import { debounce } from '../utility';

export const pageURL = window.location.href.split('?')[0];

export const fileType = {
  MarkDown: ['md', 'markdown'],
  JSON: ['json'],
  YAML: ['yml', 'yaml']
};

export const postMeta = /^---[\r\n]([\s\S]*?)[\r\n]---/;

export interface PostMeta
  extends Record<'title' | 'date', string>,
    Partial<Record<string, any>> {
  authors?: string[];
}

export type HyperLink = HTMLAnchorElement | HTMLImageElement;

@observer
export class Editor extends PureComponent<{ repository: string }> {
  private Selector = createRef<PathSelect>();

  get selector() {
    return this.Selector.current;
  }

  private Core = createRef<MarkdownEditor>();

  get core() {
    return this.Core.current;
  }

  URL = '';

  @observable
  meta?: PostMeta;

  @observable
  copied = false;

  static contentFilter({ type, name }: GitContent) {
    return (
      type === 'dir' ||
      (type === 'file' &&
        Object.values(fileType).flat().includes(name.split('.').slice(-1)[0]))
    );
  }

  async setPostMeta(raw?: string) {
    const meta: PostMeta = { authors: [], ...(raw ? YAML.parse(raw) : null) };
    const { login } = await getCurrentUser();

    if (!meta.authors?.includes(login)) meta.authors?.push(login);

    const path = this.URL.split('/')
      .slice(7, -1)
      .filter(name => !name.startsWith('_'));

    meta.categories = [...new Set([...path, ...(meta.categories || [])])];
    meta.tags = meta.tags || [];

    this.meta = { ...meta, title: '', date: formatDate() };
  }

  setContent = async (URL: string, data?: Blob) => {
    this.URL = URL;

    const type = URL.split('.').slice(-1)[0];

    if (!(data instanceof Blob)) {
      if (fileType.MarkDown.includes(type)) await this.setPostMeta();

      return;
    }
    var content = (await readAs(data, 'text').result) as string;

    if (fileType.JSON.includes(type)) return (this.meta = JSON.parse(content));

    if (fileType.YAML.includes(type)) return (this.meta = YAML.parse(content));

    const meta = postMeta.exec(content);

    if (!meta) await this.setPostMeta();
    else {
      content = content.slice(meta[0].length);

      meta[1] = meta[1].trim();

      if (meta[1]) this.setPostMeta(meta[1]);
    }

    if (this.core) this.core.raw = content;
  };

  reset = () => {
    this.meta = undefined;

    if (this.selector) this.selector.reset();
    if (this.core) this.core.raw = '';
  };

  onPathClear = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value.trim()) return;

    this.meta = undefined;

    if (this.core) this.core.raw = '';
  };

  fixURL = debounce(() => {
    const { repository } = this.props;

    if (this.core && this.core.root)
      for (let element of this.core.root.querySelectorAll<HyperLink>(
        '[href], [src]'
      )) {
        let URI =
          element instanceof HTMLAnchorElement ? element.href : element.src;

        if (URI.startsWith(pageURL)) URI = URI.slice(pageURL.length);

        URI = new URL(URI, this.URL || window.location.href) + '';

        if (element instanceof HTMLImageElement)
          element.src = URI.replace(
            repository + '/blob/',
            repository + '/raw/'
          );
        else element.href = URI;
      }
  });

  getContent() {
    const type = this.URL.split('.').slice(-1)[0],
      { meta, core } = this;

    if (fileType.JSON.includes(type)) return JSON.stringify(meta);

    if (fileType.YAML.includes(type)) return YAML.stringify(meta);

    if (fileType.MarkDown.includes(type) && core) {
      if (!meta) return core.raw;
      // @ts-ignore
      meta.updated = formatDate();

      return `---
${YAML.stringify(meta)}
---

${core.raw}`;
    }
  }

  submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { repository } = this.props,
      {
        // @ts-ignore
        selector: { pathName },
        core
      } = this,
      // @ts-ignore
      { message } = event.target.elements;

    if (!core || !core.root) return;

    const media: HTMLMediaElement[] = [].filter.call(
      core.root.querySelectorAll('img[src], audio[src], video[src]'),
      ({ src }) => new URL(src).protocol === 'blob:'
    );

    for (let file of media) {
      const blob = await blobOf(file.src);

      const filePath = pathName.replace(
        /\.\w+$/,
        `/${uniqueID()}.${blob.type.split('/')[1]}`
      );

      const {
        content: { download_url }
      }: any = await updateContent(
        repository,
        filePath,
        '[Upload] from Git-Pager',
        blob
      );

      file.src = download_url;
    }

    await updateContent(
      repository,
      pathName,
      message.value.trim(),
      this.getContent() as string
    );

    window.alert('Submitted');
  };

  copyMarkdown = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (this.core) {
      await navigator.clipboard.writeText(this.core.raw);

      this.copied = true;
    }
  };

  render() {
    const { repository } = this.props,
      { meta, copied } = this;

    return (
      <main className="card m-3">
        <form className="card-body" onReset={this.reset} onSubmit={this.submit}>
          <h1 className="card-title">{repository}</h1>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">File path</label>
            <div className="col-sm-10" onChange={this.onPathClear}>
              <PathSelect
                ref={this.Selector}
                repository={repository}
                filter={Editor.contentFilter}
                onLoad={this.setContent}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Commit message</label>
            <span className="col-sm-7">
              <textarea className="form-control" name="message" required />
            </span>
            <span className="col-sm-3 d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary">
                Commit
              </button>
              <button type="reset" className="btn btn-danger">
                Clear
              </button>
            </span>
          </div>

          {meta && (
            <div className="form-group">
              <label>Meta</label>
              <ListField
                value={meta}
                onChange={({ target: { value } }: any) => (this.meta = value)}
              />
            </div>
          )}

          <div className="form-group" onInput={this.fixURL}>
            <label>Content</label>
            <button
              type="button"
              className="btn btn-secondary btn-sm float-right"
              onClick={this.copyMarkdown}
              onBlur={() => (this.copied = false)}
            >
              {copied ? '√' : ''} Copy MarkDown
            </button>
            <MarkdownEditor ref={this.Core} />
          </div>
        </form>
      </main>
    );
  }
}
