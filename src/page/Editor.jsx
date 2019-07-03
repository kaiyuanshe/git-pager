import React from 'react';

import { readAs } from '../utility';
import PathSelect from '../component/PathSelect';
import MarkdownEditor from '../component/MarkdownEditor';

export default class Editor extends React.Component {
  selector;
  core;

  setContent = async (name, data) => {
    const content = await readAs(data, 'Text');

    if (/\.(md|markdown)$/i.test(name)) this.core.raw = content;
  };

  upload(files) {
    return Promise.all(files.map(file => URL.createObjectURL(file)));
  }

  reset = () => {
    this.selector.reset();
    this.core.raw = '';
  };

  render() {
    const { repository } = this.props;

    return (
      <main className="card m-3">
        <form className="card-body" onReset={this.reset}>
          <fieldset className="sticky-top bg-white">
            <h1 className="card-title">{repository}</h1>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">File path</label>
              <div className="col-sm-10">
                <PathSelect
                  ref={node => (this.selector = node)}
                  repository={repository}
                  onLoad={this.setContent}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Commit message</label>
              <span className="col-sm-7">
                <textarea className="form-control"></textarea>
              </span>
              <span className="col-sm-3 d-flex justify-content-between align-items-center">
                <input type="submit" className="btn btn-primary" />
                <input type="reset" className="btn btn-danger" />
              </span>
            </div>
          </fieldset>

          <div className="form-group">
            <label>Content</label>
            <MarkdownEditor
              ref={node => (this.core = node)}
              uploadFiles={this.upload}
            />
          </div>
        </form>
      </main>
    );
  }
}
