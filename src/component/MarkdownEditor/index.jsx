import React from 'react';

import * as MarkdownIME from 'markdown-ime';
import marked from 'marked';
import TurnDown from './TurnDown';

import { debounce, parseDOM, insertToCursor } from '../../utility';

import STYLE from './index.module.css';

export default class MarkdownEditor extends React.Component {
  root;

  state = {
    count: 0
  };

  constructor(props) {
    super(props).convertor = new TurnDown();

    for (let key in props.rules) this.convertor.addRule(key, props.rules[key]);
  }

  componentDidMount() {
    MarkdownIME.Enhance(this.root);
  }

  countText = debounce(() => {
    this.setState({ count: this.root.textContent.trim().length });
  });

  set raw(code) {
    this.root.innerHTML = marked(code);

    this.countText();

    this.root.dispatchEvent(
      new CustomEvent('input', { bubbles: true, detail: this.root.textContent })
    );
  }

  get raw() {
    return this.convertor.turndown(this.root);
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
