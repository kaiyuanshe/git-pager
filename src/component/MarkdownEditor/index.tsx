import React, { createRef } from 'react';

import * as MarkdownIME from 'markdown-ime';
import marked from 'marked';
import TurnDown from './TurnDown';

import { debounce, parseDOM, insertToCursor } from '../../utility';

import STYLE from './index.module.css';

type EditorProps = { rules: any };
type InputHandler = (event: React.FormEvent) => void;

export default class MarkdownEditor extends React.Component<EditorProps> {
  convertor: TurnDown;
  private contentEditable = createRef<HTMLDivElement>();

  get root() {
    return this.contentEditable.current;
  }

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
    var count = 0;

    if (this.root) count = (this.root.textContent || '').trim().length;

    this.setState({ count });
  });

  set raw(code) {
    if (!this.root) return;

    this.root.innerHTML = marked(code);

    this.countText();

    this.root.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        detail: this.root.textContent
      })
    );
  }

  get raw() {
    return this.root ? this.convertor.turndown(this.root) : '';
  }

  handleFiles = async (event: React.DragEvent | React.ClipboardEvent) => {
    // @ts-ignore
    const { files } = event.dataTransfer || event.clipboardData;

    if (!files[0]) return;

    event.preventDefault();

    const list = Array.from(files, (file: File) => {
      const type = file.type.split('/')[0],
        src = URL.createObjectURL(file);

      switch (type) {
        case 'image':
          return parseDOM(`<img src=${src}>`);
        case 'audio':
          return parseDOM(`<audio src=${src}></audio>`);
        case 'video':
          return parseDOM(`<video src=${src}></video>`);
      }
    });

    insertToCursor(...list.flat());
  };

  render() {
    return (
      <div
        contentEditable
        ref={this.contentEditable}
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
