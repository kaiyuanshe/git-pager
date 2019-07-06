import React from 'react';

import PathSelect from '../component/PathSelect';
import MarkdownEditor from '../component/MarkdownEditor';

import { readAs } from '../utility';
import { updateContent } from '../service';

export default class Editor extends React.Component {
  selector;
  core;
  method;

  setContent = async (name, data) => {
    this.method = data ? 'PUT' : 'POST';

    if (!(data instanceof Blob)) return;

    const content = await readAs(data, 'Text');

    if (/\.(md|markdown)$/i.test(name)) this.core.raw = content;
  };

  reset = () => {
    this.selector.reset();
    this.core.raw = '';
  };

  submit = async event => {
    event.preventDefault();

    const { repository } = this.props,
      {
        selector: { path, name },
        core: { root },
        method
      } = this;

    const media = [].filter.call(
      root.querySelectorAll('img[src], audio[src], video[src]'),
      ({ src }) => new URL(src).protocol === 'blob:'
    );

    for (let file of media)
      await updateContent(repository, `${path}/${file.name}`, file);

    await updateContent(repository, `${path}/${name}`, root.raw, method);

    window.alert('Submitted');
  };

  render() {
    const { repository } = this.props;

    return (
      <main className="card m-3">
        <form className="card-body" onReset={this.reset} onSubmit={this.submit}>
          <fieldset className="sticky-top bg-white">
            <h1 className="card-title">{repository}</h1>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">File path</label>
              <div className="col-sm-10">
                <PathSelect
                  ref={node => (this.selector = node)}
                  repository={repository}
                  onLoad={this.setContent}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Commit message</label>
              <span className="col-sm-7">
                <textarea className="form-control" required></textarea>
              </span>
              <span className="col-sm-3 d-flex justify-content-between align-items-center">
                <input type="submit" className="btn btn-primary" />
                <input type="reset" className="btn btn-danger" />
              </span>
            </div>
          </fieldset>

          <div className="form-group">
            <label>Content</label>
            <MarkdownEditor ref={node => (this.core = node)} />
          </div>
        </form>
      </main>
    );
  }
}
