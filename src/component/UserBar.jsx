import React from 'react';

import { getCurrentUser } from '../service';

export default class UserBar extends React.Component {
  state = {
    name: 'GitHub',
    avatar_url:
      'https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png',
    html_url: 'https://github.com/',
    blog: ''
  };

  async componentDidMount() {
    this.setState(await getCurrentUser());
  }

  render() {
    const { name, avatar_url, html_url, blog } = this.state;

    return (
      <a href={blog || html_url} title={name}>
        <img
          className="img-thumbnail"
          style={{ width: '2.5rem' }}
          alt={name}
          src={avatar_url}
        />
      </a>
    );
  }
}
