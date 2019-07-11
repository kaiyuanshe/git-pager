import React, { createRef } from 'react';

import PathSelect, { GitContent } from '../component/PathSelect';
import { ListField } from '../component/JSONEditor';
import MarkdownEditor from '../component/MarkdownEditor';

import YAML from 'yaml';
import { readAs, debounce, blobOf, uniqueID } from '../utility';
import { updateContent } from '../service';

const File_Type = {
    MarkDown: ['md', 'markdown'],
    JSON: ['json'],
    YAML: ['yml', 'yaml']
  },
  GitHub_Relative = /^https:\/\/github.com\/(?:[^/]+\/){2}(?:tree|blob|raw)\/[^/]+\//;

type HyperLink = HTMLAnchorElement & HTMLImageElement;

const pageURL = window.location.href.split('?')[0],
  rules = {
    relative_URL: {
      filter: (node: HyperLink) =>
        ['a', 'area', 'img'].includes(node.nodeName.toLowerCase()) &&
        GitHub_Relative.test(node.href || node.src),
      replacement(
        _: string,
        { href, src, title, textContent, alt }: HyperLink
      ) {
        const path = (href || src).replace(GitHub_Relative, '');

        if ((title = title.trim())) title = ` '${title}'`;

        return src
          ? `![${alt}](${path}${title})`
          : `[${(textContent || '').trim()}](${path}${title})`;
      }
    }
  };

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
  SHA = '';

  state = {
    meta: null
  };

  static contentFilter({ type, name }: GitContent) {
    return (
      type === 'dir' ||
      (type === 'file' &&
        Object.values(File_Type)
          .flat()
          .includes(name.split('.').slice(-1)[0]))
    );
  }

  setContent = async (URL: string, SHA?: string, data?: Blob) => {
    if (!(data instanceof Blob)) return;

    const type = URL.split('.').slice(-1)[0];

    var content = (await readAs(data, 'Text')) as string;

    this.URL = URL;
    this.SHA = SHA || '';

    if (File_Type.JSON.includes(type))
      return this.setState({ meta: JSON.parse(content) });

    if (File_Type.YAML.includes(type))
      return this.setState({ meta: YAML.parse(content) });

    const meta = /^---[\r\n]([\s\S]*?)[\r\n]---/.exec(content);

    if (!meta) this.setState({ meta: { title: '' } });
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

    if (File_Type.JSON.includes(type)) return JSON.stringify(meta);

    if (File_Type.YAML.includes(type)) return YAML.stringify(meta);

    if (File_Type.MarkDown.includes(type) && core)
      return !meta
        ? core.raw
        : `---
${YAML.stringify(meta)}
---

${core.raw}`;
  }

  submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { repository } = this.props,
      {
        // @ts-ignore
        selector: { path, pathName },
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

      await updateContent(
        repository,
        `${path}/${uniqueID()}.${blob.type.split('/')[1]}`,
        '[Upload] from Git-Pager',
        blob
      );
    }

    await updateContent(
      repository,
      pathName,
      message.value.trim(),
      this.getContent() as string,
      this.SHA
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
            <MarkdownEditor ref={this.Core} rules={rules} />
          </div>
        </form>
      </main>
    );
  }
}
