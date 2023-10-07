import { observer } from 'mobx-react';
import { FC } from 'react';

import { NavBar, NavBarProps } from '../component/NavBar';
import { UserBar } from '../component/UserBar';
import ApplicationModel from '../model';
import { Editor } from './Editor';

export interface FrameProps {
  navData: NavBarProps;
  repository: string;
  store: ApplicationModel;
}

export const Application: FC<FrameProps> = observer(
  ({ navData, repository, store }) => (
    <>
      <NavBar
        {...navData}
        expand="sm"
        theme="dark"
        background="dark"
        rightSlot={<UserBar {...store.user} />}
      />
      <main
        className="container"
        style={{ cursor: store.loadingCount ? 'wait' : 'auto' }}
      >
        <Editor repository={repository} />
      </main>
    </>
  )
);
