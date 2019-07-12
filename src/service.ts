import { parseCookie, parseURLData, encodeBase64, readAs } from './utility';
import Octokit from '@octokit/rest';

const { token }: any = { ...parseCookie(), ...parseURLData() };

const github = new Octokit({ auth: token });

/**
 * @return {Promise<Object>}
 */
export async function getCurrentUser() {
  return (await github.users.getAuthenticated()).data;
}

/**
 * @param {String} repository
 * @param {String} [path='']
 *
 * @return {Promise<Object|Object[]>}
 */
export async function getContents(repository: string, path = '') {
  const [owner, repo] = repository.split('/');

  return (await github.repos.getContents({ owner, repo, path })).data;
}

/**
 * @param {String}      repository
 * @param {String}      path
 * @param {String}      message
 * @param {String|Blob} data
 *
 * @return {Promise<Object>}
 */
export async function updateContent(
  repository: string,
  path: string,
  message: string,
  data: string | Blob
) {
  const [owner, repo] = repository.split('/');

  try {
    var sha = (await getContents(repository, path)).sha;
  } catch {}

  return (await github.repos.createOrUpdateFile({
    owner,
    repo,
    path,
    message,
    content: encodeBase64(
      data instanceof Blob
        ? ((await readAs(data, 'BinaryString')) as string)
        : data
    ),
    sha
  })).data;
}
