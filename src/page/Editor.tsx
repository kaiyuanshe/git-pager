import React, { createRef } from 'react';

import PathSelect, { GitContent } from '../component/PathSelect';
import { ListField } from '../component/JSONEditor';
import MarkdownEditor from '../component/MarkdownEditor';

import YAML from 'yaml';
import { readAs, debounce, blobOf, uniqueID, formatDate } from '../utility';
import { getCurrentUser, updateContent } from '../service';

export const pageURL = window.location.href.split('?')[0];

export const fileType = {
  MarkDown: ['md', 'markdown'],
  JSON: ['json'],
  YAML: ['yml', 'yaml']
};

export const postMeta = /^---[\r\n]([\s\S]*?)[\r\n]---/;

export type HyperLink = HTMLAnchorElement & HTMLImageElement;

export default class Editor extends React.Component<{ repository: string }> {
  private Selector = createRef<PathSelect>();

  get selector() {
    return this.Selector.current;
  }

  private Core = createRef<MarkdownEditor>();

  get core() {
    return this.Core.current;
  }

  URL = '';

  state = {
    meta: null
  };

  static contentFilter({ type, name }: GitContent) {
    return (
      type === 'dir' ||
      (type === 'file' &&
        Object.values(fileType)
          .flat()
          .includes(name.split('.').slice(-1)[0]))
    );
  }

  async setDefaultMeta() {
    const { login } = await getCurrentUser();

    this.setState({
      meta: { title: '', date: formatDate(), authors: [login] }
    });
  }

  setContent = async (URL: string, data?: Blob) => {
    this.URL = URL;

    const type = URL.split('.').slice(-1)[0];

    if (!(data instanceof Blob)) {
      if (fileType.MarkDown.includes(type)) await this.setDefaultMeta();

      return;
    }

    var content = (await readAs(data, 'Text')) as string;

    if (fileType.JSON.includes(type))
      return this.setState({ meta: JSON.parse(content) });

    if (fileType.YAML.includes(type))
      return this.setState({ meta: YAML.parse(content) });

    const meta = postMeta.exec(content);

    if (!meta) await this.setDefaultMeta();
    else {
      content = content.slice(meta[0].length);

      meta[1] = meta[1].trim();

      if (meta[1]) this.setState({ meta: YAML.parse(meta[1]) });
    }

    if (this.core) this.core.raw = content;
  };

  reset = () => {
    this.setState({ meta: null });

    if (this.selector) this.selector.reset();
    if (this.core) this.core.raw = '';
  };

  onPathClear = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    !value.trim() && this.reset();

  fixURL = debounce(() => {
    const { repository } = this.props;

    if (this.core && this.core.root)
      for (let element of this.core.root.querySelectorAll<HyperLink>(
        '[href], [src]'
      )) {
        let URI = element.href || element.src;

        if (URI.startsWith(pageURL)) URI = URI.slice(pageURL.length);

        URI = new URL(URI, this.URL) + '';

        if ('src' in element)
          element.src = URI.replace(
            repository + '/blob/',
            repository + '/raw/'
          );
        else element.href = URI;
      }
  });

  getContent() {
    const type = this.URL.split('.').slice(-1)[0],
      {
        state: { meta },
        core
      } = this;

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

  render() {
    const {
      props: { repository },
      state: { meta }
    } = this;

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
              <textarea
                className="form-control"
                name="message"
                required
              ></textarea>
            </span>
            <span className="col-sm-3 d-flex justify-content-between align-items-center">
              <input type="submit" className="btn btn-primary" />
              <input type="reset" className="btn btn-danger" />
            </span>
          </div>

          {meta && (
            <div className="form-group">
              <label>Meta</label>
              <ListField
                value={meta}
                onChange={({ target: { value } }: any) =>
                  this.setState({ meta: value })
                }
              />
            </div>
          )}

          <div className="form-group" onInput={this.fixURL}>
            <label>Content</label>
            <MarkdownEditor ref={this.Core} />
          </div>
        </form>
      </main>
    );
  }
}
