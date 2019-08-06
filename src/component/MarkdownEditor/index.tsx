import React, { createRef } from 'react';

import * as MarkdownIME from 'markdown-ime';
import marked from 'marked';
import TurnDown from './TurnDown';

import { debounce, parseDOM, insertToCursor } from '../../utility';

import STYLE from './index.module.css';

type EditorProps = { rules?: any };
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

  private manualChange() {
    this.countText();

    if (this.root)
      this.root.dispatchEvent(
        new CustomEvent('input', {
          bubbles: true,
          detail: this.root.textContent
        })
      );
  }

  set raw(code) {
    if (!this.root) return;

    this.root.innerHTML = marked(code);

    this.manualChange();
  }

  get raw() {
    return this.root ? this.convertor.turndown(this.root) : '';
  }

  handleOuterData = async (event: React.DragEvent | React.ClipboardEvent) => {
    // @ts-ignore
    const { items } = event.dataTransfer || event.clipboardData;

    if (!items[0]) return;

    event.preventDefault();

    var hasXML = false;

    const list = await Promise.all(
      Array.from(items, (item: DataTransferItem) => {
        if (item.kind === 'string') {
          if (item.type !== 'text/plain') hasXML = true;
          else if (hasXML) return '';

          return new Promise(resolve =>
            item.getAsString(raw => resolve(marked(raw)))
          );
        }

        const file = item.getAsFile();

        if (file) {
          const src = URL.createObjectURL(file);

          switch (item.type.split('/')[0]) {
            case 'image':
              return `<img src=${src}>`;
            case 'audio':
              return `<audio src=${src}></audio>`;
            case 'video':
              return `<video src=${src}></video>`;
          }
        }
        return '';
      })
    );

    insertToCursor(...parseDOM(list.filter(Boolean).join('\n')));

    this.manualChange();
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
        onPaste={this.handleOuterData}
        onDrop={this.handleOuterData}
      ></div>
    );
  }
}
