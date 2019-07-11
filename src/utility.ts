export function isEmpty(value: any) {
  return !(value != null) || (typeof value === 'number' && isNaN(value));
}

export function uniqueID() {
  return parseInt((Math.random() + '').slice(2)).toString(36);
}

/**
 * @param {Function} origin
 * @param {Number}   [interval=0.25] - Seconds
 *
 * @return {Function}
 *
 * @see https://web-cell.dev/DOM-Renderer/function/index.html#static-function-debounce
 */
export function debounce(origin: (...data: any) => any, interval = 0.25) {
  var timer: any;

  return function(this: any, ...parameter: any[]) {
    clearTimeout(timer);

    timer = setTimeout(
      // @ts-ignore
      origin.bind.apply(origin, [].concat.apply([this], parameter)),
      interval * 1000
    );
  };
}

const sandbox = document.createElement('template'),
  fragment = document.createDocumentFragment();
/**
 * @param {String} HTML
 *
 * @return {Node[]}
 */
export function parseDOM(HTML: string) {
  sandbox.innerHTML = HTML;

  return Array.from(sandbox.content.childNodes).map(
    node => (node.remove(), node)
  );
}

export function insertToCursor(...nodes: Node[]) {
  fragment.append(...nodes);

  const selection = window.getSelection();

  if (selection) selection.getRangeAt(0).insertNode(fragment);
}

/**
 * @param {String|URL} URI - Full URL of a resource
 *
 * @return {Boolean} Whether it's cross domain to current page
 *
 * @see https://web-cell.dev/WebCell/function/index.html#static-function-isXDomain
 */
export function isXDomain(URI: string) {
  return new URL(URI, document.baseURI).origin !== window.location.origin;
}

export function parseURLData(raw = window.location.search) {
  const data: any = {},
    parameter = (/(?:\?|#)?(\S+)/.exec(raw) || '')[1];

  for (let [key, value] of new URLSearchParams(parameter)) {
    try {
      value = JSON.parse(value);
    } catch {}

    if (isEmpty(data[key])) {
      data[key] = value;
      continue;
    }

    if (!(data[key] instanceof Array)) data[key] = [data[key]];

    data[key].push(value);
  }

  return data;
}

export function parseCookie(raw = document.cookie) {
  return Object.fromEntries(
    raw.split(/;\s*/).map(item => {
      const data = item.split('=');

      return [data.shift(), data.join('=')];
    })
  );
}

/**
 * @param {String} raw - Binary data
 *
 * @return {String} Base64 encoded data
 *
 * @see https://web-cell.dev/WebCell/function/index.html#static-function-encodeBase64
 */
export function encodeBase64(raw: string) {
  return window.btoa(
    encodeURIComponent(raw).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(+('0x' + p1))
    )
  );
}

const DataURI = /^data:(.+?\/(.+?))?(;base64)?,([\s\S]+)/;
/**
 * @param {String} URI - Data URI
 *
 * @return {Blob}
 *
 * @see https://web-cell.dev/WebCell/function/index.html#static-function-blobFrom
 */
export function blobFrom(URI: string) {
  // @ts-ignore
  var [_, type, __, base64, data] = DataURI.exec(URI) || [];

  data = base64 ? window.atob(data) : data;

  const aBuffer = new ArrayBuffer(data.length);

  const uBuffer = new Uint8Array(aBuffer);

  for (let i = 0; data[i]; i++) uBuffer[i] = data.charCodeAt(i);

  return new Blob([aBuffer], { type });
}

export async function blobOf(URI: string) {
  return (await fetch(URI)).blob();
}

/**
 * @param {Blob}   data
 * @param {String} [type='DataURL']   - https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Methods
 * @param {String} [encoding='UTF-8'] - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText#Parameters
 *
 * @return {Promise<String|ArrayBuffer>}
 *
 * @see https://web-cell.dev/WebCell/function/index.html#static-function-readAs
 */
export function readAs(
  data: Blob,
  type = 'DataURL',
  encoding = 'UTF-8'
): Promise<String | ArrayBuffer | null> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;

    switch (type) {
      case 'Text':
        return reader.readAsText(data, encoding);
      case 'DataURL':
        return reader.readAsDataURL(data);
      case 'BinaryString':
        return reader.readAsBinaryString(data);
      case 'ArrayBuffer':
        return reader.readAsArrayBuffer(data);
    }

    throw TypeError('Unsupported type: ' + type);
  });
}
