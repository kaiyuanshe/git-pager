import TurnDown from 'turndown';
// @ts-ignore
import { gfm } from 'turndown-plugin-gfm';

const Empty_HREF = /^(#|javascript:\s*void\(0\);?\s*)$/;

type TurnDownGFM = (td: TurnDown) => void;

export default class extends TurnDown {
  constructor(options?: any) {
    super({
      headingStyle: 'atx',
      hr: '---',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      linkStyle: 'referenced',
      ...options
    });

    this.use(gfm as TurnDownGFM)
      .addRule('non_url', {
        filter: node =>
          // @ts-ignore
          ['a', 'area'].includes(node.nodeName.toLowerCase()) &&
          // @ts-ignore
          Empty_HREF.test(node.getAttribute('href')),
        // @ts-ignore
        replacement: (content, node) => content.trim() || node.title.trim()
      })
      .addRule('asset_code', {
        filter: ['style', 'script'],
        replacement: () => ''
      });
  }
}
