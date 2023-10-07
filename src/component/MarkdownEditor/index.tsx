import classNames from 'classnames';
import * as MarkdownIME from 'markdown-ime';
import { marked } from 'marked';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { PureComponent, createRef } from 'react';
import { insertToCursor, parseDOM } from 'web-utility';

import { debounce } from '../../utility';
import TurnDown from './TurnDown';
import * as STYLE from './index.module.less';

export type EditorProps = { rules?: any };
type InputHandler = (event: React.FormEvent) => void;

@observer
export class MarkdownEditor extends PureComponent<EditorProps> {
  convertor: TurnDown;
  private contentEditable = createRef<HTMLDivElement>();

  get root() {
    return this.contentEditable.current;
  }

  @observable
  count = 0;

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

    this.count = count;
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

    var list: DataTransferItem[] = Array.from(items);

    if (list.find(({ type }) => /xml|html/.test(type)))
      list = list.filter(({ type }) => type !== 'text/plain');

    const parts = await Promise.all(
      list.map((item: DataTransferItem) => {
        if (item.kind === 'string')
          return new Promise(resolve =>
            item.getAsString(raw => resolve(marked(raw)))
          );

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

    insertToCursor(...parseDOM(parts.filter(Boolean).join('\n')));

    if (this.root)
      for (const paragraph of this.root.querySelectorAll('p p'))
        paragraph.replaceWith(...paragraph.childNodes);

    this.manualChange();
  };

  render() {
    return (
      <div
        contentEditable
        ref={this.contentEditable}
        className={classNames(
          'form-control',
          'markdown-body',
          'h-auto',
          STYLE.editor
        )}
        data-count={this.count}
        onInput={this.countText as InputHandler}
        onPaste={this.handleOuterData}
        onDrop={this.handleOuterData}
      />
    );
  }
}
