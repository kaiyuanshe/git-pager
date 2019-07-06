import { parseURLData } from './utility';

const { token } = parseURLData();

/**
 * @param {String} path
 * @param {Object} [options={}] - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
 *
 * @return {Promise<Object|Object[]>}
 *
 * @throw {URIError}
 */
export async function request(path, options = {}) {
  const response = await fetch('https://api.github.com' + path, {
    headers: {
      Authorization: 'token ' + token,
      ...options.headers
    },
    ...options
  });

  const data = await response.json();

  if (response.status > 299)
    throw Object.assign(new URIError(data.message), { data, response });

  return data;
}

/**
 * @return {Promise<Object>}
 */
export function getCurrentUser() {
  return request('/user');
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

/**
 * @param {String}      repository
 * @param {String}      path
 * @param {String|Blob} data
 * @param {String}      [method='POST']
 *
 * @return {Promise<Object|Object[]>}
 */
export async function updateContent(repository, path, data, method = 'POST') {
  console.log(repository, path, data, method);

  return {};
}
