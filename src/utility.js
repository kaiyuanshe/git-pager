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
