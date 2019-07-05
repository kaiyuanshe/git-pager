import React from 'react';
import * as MarkdownIME from 'markdown-ime';
import marked from 'marked';

import { debounce, parseDOM, insertToCursor } from '../../utility';

import STYLE from './index.module.css';

export default class MarkdownEditor extends React.Component {
  root;

  state = {
    count: 0
  };

  componentDidMount() {
    MarkdownIME.Enhance(this.root);
  }

  countText = debounce(() => {
    this.setState({ count: this.root.textContent.trim().length });
  });

  set raw(code) {
    this.root.innerHTML = marked(code);
  }

  handleFiles = async event => {
    var { files } = event.dataTransfer || event.clipboardData;

    if (!files[0]) return;

    event.preventDefault();

    files = Array.from(files, file => {
      const type = file.type.split('/')[0];

      file = URL.createObjectURL(file);

      switch (type) {
        case 'image':
          return parseDOM(`<img src=${file}>`);
        case 'audio':
          return parseDOM(`<audio src=${file}></audio>`);
        case 'video':
          return parseDOM(`<video src=${file}></video>`);
      }
    });

    insertToCursor(...files.flat());
  };

  render() {
    return (
      <div
        contentEditable
        ref={node => (this.root = node)}
        className={`form-control ${STYLE.editor}`}
        style={{ height: 'auto' }}
        data-count={this.state.count}
        onInput={this.countText}
        onPaste={this.handleFiles}
        onDrop={this.handleFiles}
      ></div>
    );
  }
}
