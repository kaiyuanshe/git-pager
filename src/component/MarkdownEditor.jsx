import React from 'react';
import * as MarkdownIME from 'markdown-ime';

import { parseDOM, insertToCursor } from '../utility';

export default class MarkdownEditor extends React.Component {
  root;

  componentDidMount() {
    MarkdownIME.Enhance(this.root);
  }

  handleFiles = async event => {
    event.preventDefault();

    var { files } = event.dataTransfer || event.clipboardData;

    files = [...files];

    var list = await this.props.uploadFiles(files);

    list = Array.from(list, (URL, index) => {
      const type = files[index].type.split('/')[0];

      switch (type) {
        case 'image':
          return parseDOM(`<img src=${URL}>`);
        case 'audio':
          return parseDOM(`<audio src=${URL}></audio>`);
        case 'video':
          return parseDOM(`<video src=${URL}></video>`);
      }
    });

    insertToCursor(...list.flat());
  };

  render() {
    return (
      <div
        contentEditable
        ref={node => (this.root = node)}
        className="form-control"
        style={{ height: 'auto' }}
        onPaste={this.handleFiles}
        onDrop={this.handleFiles}
      ></div>
    );
  }
}
