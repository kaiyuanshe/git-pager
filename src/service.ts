import { Octokit } from '@octokit/rest';
import { parseURLData } from 'web-utility';

import { encodeBase64, parseCookie } from './utility';

const { token }: any = { ...parseCookie(), ...parseURLData() };

const github = new Octokit({ auth: token });

export async function getCurrentUser() {
  const { data } = await github.users.getAuthenticated();

  return data;
}

export async function getContents(repository: string, path = '') {
  const [owner, repo] = repository.split('/');

  const { data } = await github.repos.getContent({ owner, repo, path });

  return data;
}

export async function updateContent(
  repository: string,
  path: string,
  message: string,
  content: string | Blob
) {
  const [owner, repo] = repository.split('/');

  try {
    const data = await getContents(repository, path);

    var { sha } = data instanceof Array ? data[0] : data;
  } catch {}

  const { data } = await github.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: await encodeBase64(content),
    // @ts-ignore
    sha
  });

  return data;
}
