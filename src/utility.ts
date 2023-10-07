import { readAs } from 'koajax';

/**
 * @param  interval - Seconds
 *
 * @see https://web-cell.dev/DOM-Renderer/function/index.html#static-function-debounce
 */
export function debounce(origin: (...data: any) => any, interval = 0.25) {
  var timer: any;

  return function (this: any, ...parameter: any[]) {
    clearTimeout(timer);

    timer = setTimeout(
      // @ts-ignore
      origin.bind.apply(origin, [].concat.apply([this], parameter)),
      interval * 1000
    );
  };
}

export function parseCookie(raw = document.cookie) {
  return Object.fromEntries(
    raw.split(/;\s*/).map(item => {
      const data = item.split('=');

      return [data.shift(), data.join('=')];
    })
  );
}

const DataURI = /^data:(.+?\/(.+?))?(;base64)?,([\s\S]+)/;
/**
 * @param  raw - Binary data
 *
 * @return  Base64 encoded data
 *
 * @see https://web-cell.dev/WebCell/function/index.html#static-function-encodeBase64
 */
export async function encodeBase64(raw: string | Blob) {
  return raw instanceof Blob
    ? (DataURI.exec((await readAs(raw, 'text').result) as string) || '')[4]
    : window.btoa(
        encodeURIComponent(raw).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(+('0x' + p1))
        )
      );
}
