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

    files = [...files];

    if (!files[0]) return;

    event.preventDefault();

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
