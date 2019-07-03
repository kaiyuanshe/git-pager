export function uniqueID() {
  return parseInt((Math.random() + '').slice(2)).toString(36);
}

const DataURI = /^data:(.+?\/(.+?))?(;base64)?,([\s\S]+)/;
/**
 * @param {String} URI - Data URI
 *
 * @return {Blob}
 *
 * @see https://web-cell.dev/WebCell/file/source/utility/resource.js.html#lineNumber190
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
 * @param {File}   file
 * @param {String} [type='DataURL']   - https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Methods
 * @param {String} [encoding='UTF-8'] - https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText#Parameters
 *
 * @return {Promise<String|ArrayBuffer>}
 *
 * @see https://web-cell.dev/WebCell/file/source/utility/resource.js.html#lineNumber211
 */
export function readAs(file, type = 'DataURL', encoding = 'UTF-8') {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);

    reader.onerror = reject;

    reader[`readAs${type}`](file, encoding);
  });
}
