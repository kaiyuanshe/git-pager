import React from 'react';
import marked from 'marked';

import { readAs } from '../utility';
import PathSelect from '../component/PathSelect';
import MarkdownEditor from '../component/MarkdownEditor';

export default class Editor extends React.Component {
  state = {
    content: ''
  };

  setContent = async (name, data) => {
    var content = await readAs(data, 'Text');

    if (/\.(md|markdown)$/i.test(name)) content = marked(content);

    this.setState({ content });
  };

  upload(files) {
    return Promise.all(files.map(file => readAs(file)));
  }

  render() {
    const { repository } = this.props;

    return (
      <main className="card" style={{ margin: '1rem' }}>
        <form className="card-body">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">File path</label>
            <div className="col-sm-10">
              <PathSelect repository={repository} onLoad={this.setContent} />
            </div>
          </div>
          <div className="form-group">
            <MarkdownEditor uploadFiles={this.upload} />
          </div>
        </form>
      </main>
    );
  }
}
