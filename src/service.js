import { parseURLData, encodeBase64 } from './utility';

const { token } = parseURLData();

/**
 * @param {String}  path
 * @param {Object}  [options={}] - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
 * @param {?Object} options.body
 *
 * @return {Promise<Object|Object[]>}
 *
 * @throw {URIError}
 */
export async function request(path, { body, ...options } = {}) {
  if (body && body instanceof Object) {
    body = JSON.stringify(body);

    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
  }

  const response = await fetch('https://api.github.com' + path, {
    headers: {
      Authorization: 'token ' + token,
      ...options.headers
    },
    body,
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
 * @param {String}      message
 * @param {String|Blob} data
 * @param {?String}     sha
 *
 * @return {Promise<Object>}
 */
export async function updateContent(repository, path, message, data, sha) {
  return request(`/repos/${repository}/contents/${path}`, {
    method: 'PUT',
    body: {
      message,
      content: encodeBase64(data),
      sha
    }
  });
}
