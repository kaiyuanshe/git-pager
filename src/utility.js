/**
 * @param {*} value
 *
 * @return {Boolean}
 */
export function isEmpty(value) {
  return !(value != null) || (typeof value === 'number' && isNaN(value));
}

/**
 * @return {String}
 */
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
export function debounce(origin, interval = 0.25) {
  var timer;

  return function() {
    clearTimeout(timer);

    timer = setTimeout(
      origin.bind.apply(origin, [].concat.apply([this], arguments)),
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
export function parseDOM(HTML) {
  sandbox.innerHTML = HTML;

  return Array.from(sandbox.content.childNodes).map(
    node => (node.remove(), node)
  );
}

/**
 * @param {...Node} nodes
 */
export function insertToCursor(...nodes) {
  fragment.append(...nodes);

  window
    .getSelection()
    .getRangeAt(0)
    .insertNode(fragment);
}

/**
 * @param {String|URL} URI - Full URL of a resource
 *
 * @return {Boolean} Whether it's cross domain to current page
 *
 * @see https://web-cell.dev/WebCell/function/index.html#static-function-isXDomain
 */
export function isXDomain(URI) {
  return new URL(URI, document.baseURI).origin !== window.location.origin;
}

/**
 * @param {String} [raw=window.location.search]
 *
 * @return {Object}
 */
export function parseURLData(raw = window.location.search) {
  const data = {},
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

/**
 * @param {String} raw - Binary data
 *
 * @return {String} Base64 encoded data
 *
 * @see https://web-cell.dev/WebCell/function/index.html#static-function-encodeBase64
 */
export function encodeBase64(raw) {
  return window.btoa(
    encodeURIComponent(raw).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode('0x' + p1)
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
export function blobFrom(URI) {
  var [_, type, __, base64, data] = DataURI.exec(URI) || [];

  data = base64 ? window.atob(data) : data;

  const aBuffer = new ArrayBuffer(data.length);

  const uBuffer = new Uint8Array(aBuffer);

  for (let i = 0; data[i]; i++) uBuffer[i] = data.charCodeAt(i);

  return new Blob([aBuffer], { type });
}

/**
 * @param {Blob}   file
 * @param {String} [type='DataURL']   - https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Methods
 * @param {String} [encoding='UTF-8'] - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText#Parameters
 *
 * @return {Promise<String|ArrayBuffer>}
 *
 * @see https://web-cell.dev/WebCell/function/index.html#static-function-readAs
 */
export function readAs(file, type = 'DataURL', encoding = 'UTF-8') {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;

    reader[`readAs${type}`](file, encoding);
  });
}
