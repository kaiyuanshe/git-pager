import TurnDown from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const Empty_HREF = /^(#|javascript:\s*void\(0\);?\s*)$/;

export default class extends TurnDown {
  constructor(options) {
    super({
      headingStyle: 'atx',
      hr: '---',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      linkStyle: 'referenced',
      ...options
    })
      .use(gfm)
      .addRule('non_url', {
        filter: node =>
          ['a', 'area'].includes(node.nodeName.toLowerCase()) &&
          Empty_HREF.test(node.getAttribute('href')),
        replacement: (content, node) => content.trim() || node.title.trim()
      })
      .addRule('asset_code', {
        filter: ['style', 'script'],
        replacement: () => ''
      });
  }
}
