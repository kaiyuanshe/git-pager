import React from 'react';

import * as MarkdownIME from 'markdown-ime';
import marked from 'marked';
import TurnDown from './TurnDown';

import { debounce, parseDOM, insertToCursor } from '../../utility';

import STYLE from './index.module.css';

type EditorProps = { rules: any };
type InputHandler = (event: React.FormEvent) => void;

export default class MarkdownEditor extends React.Component<EditorProps> {
  convertor: TurnDown;
  root: any;

  state = {
    count: 0
  };

  constructor(props: EditorProps) {
    super(props);

    this.convertor = new TurnDown();

    for (let key in props.rules) this.convertor.addRule(key, props.rules[key]);
  }

  componentDidMount() {
    // @ts-ignore
    MarkdownIME.Enhance(this.root);
  }

  countText = debounce(() => {
    // @ts-ignore
    this.setState({ count: this.root.textContent.trim().length });
  });

  set raw(code) {
    // @ts-ignore
    this.root.innerHTML = marked(code);

    this.countText();

    // @ts-ignore
    this.root.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        // @ts-ignore
        detail: this.root.textContent
      })
    );
  }

  get raw() {
    return this.convertor.turndown(this.root);
  }

  handleFiles = async (event: React.DragEvent | React.ClipboardEvent) => {
    // @ts-ignore
    var { files } = event.dataTransfer || event.clipboardData;

    if (!files[0]) return;

    event.preventDefault();

    files = Array.from(files, (file: File) => {
      const type = file.type.split('/')[0];
      // @ts-ignore
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
        onInput={this.countText as InputHandler}
        onPaste={this.handleFiles}
        onDrop={this.handleFiles}
      ></div>
    );
  }
}
