import React from 'react';

import NavBar, { NavBarProps } from '../component/NavBar';
import UserBar from '../component/UserBar';
import Editor from './Editor';

interface FrameProps {
  navData: NavBarProps;
  repository: string;
}

export default function PageFrame({ navData, repository }: FrameProps) {
  return (
    <>
      <NavBar
        {...navData}
        expand="sm"
        theme="dark"
        background="dark"
        rightSlot={<UserBar />}
      />
      <main className="container">
        <Editor repository={repository} />
      </main>
    </>
  );
}
