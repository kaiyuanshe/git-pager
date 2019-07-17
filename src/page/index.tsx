import React from 'react';
import { observer } from 'mobx-react';

import NavBar, { NavBarProps } from '../component/NavBar';
import UserBar from '../component/UserBar';
import Editor from './Editor';

import Application from '../model';

interface FrameProps {
  navData: NavBarProps;
  repository: string;
  store: Application;
}

export default observer(function Application({
  navData,
  repository,
  store
}: FrameProps) {
  return (
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
  );
});
