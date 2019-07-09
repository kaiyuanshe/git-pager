import React from 'react';

import PathSelect from '../component/PathSelect';
import { ListField } from '../component/JSONEditor';
import MarkdownEditor from '../component/MarkdownEditor';

import YAML from 'yaml';
import { readAs, debounce } from '../utility';
import { updateContent } from '../service';

const File_Type = {
    MarkDown: ['md', 'markdown'],
    JSON: ['json'],
    YAML: ['yml', 'yaml']
  },
  GitHub_Relative = /^https:\/\/github.com\/(?:[^/]+\/){2}(?:tree|blob|raw)\/[^/]+\//;

const pageURL = window.location.href.split('?')[0],
  rules = {
    relative_URL: {
      filter: node =>
        ['a', 'area', 'img'].includes(node.nodeName.toLowerCase()) &&
        GitHub_Relative.test(node.href || node.src),
      replacement(_, { href, src, title, textContent, alt }) {
        const path = (href || src).replace(GitHub_Relative, '');

        if ((title = title.trim())) title = ` '${title}'`;

        return src
          ? `![${alt}](${path}${title})`
          : `[${textContent.trim()}](${path}${title})`;
      }
    }
  };

export default class Editor extends React.Component {
  selector;
  core;
  URL;
  SHA;

  state = {
    meta: null
  };

  static contentFilter({ type, name }) {
    return (
      type === 'dir' ||
      (type === 'file' &&
        Object.values(File_Type)
          .flat()
          .includes(name.split('.').slice(-1)[0]))
    );
  }

  setContent = async (URL, SHA, data) => {
    if (!(data instanceof Blob)) return;

    const type = URL.split('.').slice(-1)[0];

    var content = await readAs(data, 'Text');

    this.URL = URL;
    this.SHA = SHA;

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

    this.core.raw = content;
  };

  reset = () => {
    this.setState({ meta: null });

    this.selector.reset();
    this.core.raw = '';
  };

  fixURL = debounce(() => {
    const { repository } = this.props;

    for (let element of this.core.root.querySelectorAll('[href], [src]')) {
      let URI = element.href || element.src;

      if (URI.startsWith(pageURL)) URI = URI.slice(pageURL.length);

      URI = new URL(URI, this.URL);

      if ('src' in element)
        element.src = (URI + '').replace(
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

    if (File_Type.MarkDown.includes(type))
      return !meta
        ? core.raw
        : `---
${YAML.stringify(meta)}
---

${core.raw}`;
  }

  submit = async event => {
    event.preventDefault();

    const { repository } = this.props,
      {
        selector: { path, pathName },
        core
      } = this,
      { message } = event.target.elements;

    const media = [].filter.call(
      core.root.querySelectorAll('img[src], audio[src], video[src]'),
      ({ src }) => new URL(src).protocol === 'blob:'
    );

    for (let file of media)
      await updateContent(
        repository,
        `${path}/${file.name}`,
        '[Upload] from Git-Pager',
        file
      );

    await updateContent(
      repository,
      pathName,
      message.value.trim(),
      this.getContent(),
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
            <div className="col-sm-10">
              <PathSelect
                ref={node => (this.selector = node)}
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
                onChange={({ target: { value } }) =>
                  this.setState({ meta: value })
                }
              />
            </div>
          )}

          <div className="form-group" onInput={this.fixURL}>
            <label>Content</label>
            <MarkdownEditor ref={node => (this.core = node)} rules={rules} />
          </div>
        </form>
      </main>
    );
  }
}
