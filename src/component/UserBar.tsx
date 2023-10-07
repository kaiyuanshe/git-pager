import { observer } from 'mobx-react';
import { FC } from 'react';

import { User } from '../model';

export const UserBar: FC<User> = observer(
  ({ name, avatar_url, html_url, blog }) => (
    <a href={blog || html_url} title={name!}>
      <img
        className="img-thumbnail"
        style={{ width: '2.5rem' }}
        alt={name!}
        src={avatar_url}
      />
    </a>
  )
);
