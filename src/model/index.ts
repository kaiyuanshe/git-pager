import { observable, action } from 'mobx';
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

export type User = Pick<
  RestEndpointMethodTypes['users']['getAuthenticated']['response']['data'],
  'name' | 'avatar_url' | 'html_url' | 'blog'
>;

export default class Application {
  client: Octokit;

  constructor(token: string) {
    this.client = new Octokit({ auth: token });

    this.client.hook.before('request', () => {
      this.loadingCount++;
    });
    this.client.hook.after('request', () => {
      this.loadingCount--;
    });
  }

  @observable loadingCount = 0;

  @observable user: User = {
    name: 'GitHub',
    avatar_url:
      'https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png',
    html_url: 'https://github.com/',
    blog: ''
  };

  @action async signIn() {
    const {
      data: { name, avatar_url, html_url, blog }
    } = await this.client.users.getAuthenticated();

    Object.assign(this.user, { name, avatar_url, html_url, blog });
  }
}
