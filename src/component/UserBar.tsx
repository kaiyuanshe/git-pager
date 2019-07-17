import React from 'react';
import { observer } from 'mobx-react';

export default observer(function UserBar({ name, avatar_url, html_url, blog }) {
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
});
