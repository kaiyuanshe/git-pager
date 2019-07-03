const token = new URLSearchParams(window.location.search).get('token');

/**
 * @param {String} path
 * @param {Object} [options={}] - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
 *
 * @return {Promise<Object|Object[]>}
 */
export async function request(path, options = {}) {
  return (await fetch('https://api.github.com' + path, {
    headers: {
      Authorization: 'token ' + token,
      ...options.headers
    },
    ...options
  })).json();
}

/**
 * @param {String} repository
 * @param {String} [path='']
 *
 * @return {Promise<Object|Object[]>}
 */
export function getContents(repository, path = '') {
  return request(`/repos/${repository}/contents/${path}`);
}
