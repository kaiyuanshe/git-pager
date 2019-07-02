const token = new URLSearchParams(window.location.search).get('token');

export async function request(path, options = {}) {
  return (await fetch('https://api.github.com' + path, {
    headers: {
      Authorization: 'token ' + token,
      ...options.headers
    },
    ...options
  })).json();
}

export function getContents(repository, path = '') {
  return request(`/repos/${repository}/contents/${path}`);
}
