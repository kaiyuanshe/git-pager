import React from 'react';

import PathSelect from '../component/PathSelect';
import { ListField } from '../component/JSONEditor';
import MarkdownEditor from '../component/MarkdownEditor';

import { readAs, debounce } from '../utility';
import { updateContent } from '../service';

const GitHub_Relative = /^https:\/\/github.com\/(?:[^/]+\/){2}(?:tree|blob|raw)\/[^/]+\//;

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

  setContent = async (URL, SHA, data) => {
    if (!(data instanceof Blob)) return;

    const content = await readAs(data, 'Text');

    this.URL = URL;
    this.SHA = SHA;
    this.core.raw = content;
  };

  reset = () => {
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
      core.raw,
      this.SHA
    );

    window.alert('Submitted');
  };

  render() {
    const { repository } = this.props;

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
                filter={({ type, name }) =>
                  type === 'dir' ||
                  (type === 'file' && /\.(md|markdown)$/i.test(name))
                }
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

          <div className="form-group">
            <label>Meta</label>
            <ListField type="object" />
          </div>

          <div className="form-group" onInput={this.fixURL}>
            <label>Content</label>
            <MarkdownEditor ref={node => (this.core = node)} rules={rules} />
          </div>
        </form>
      </main>
    );
  }
}
