import React from 'react';

import NavBar from '../component/NavBar';
import UserBar from '../component/UserBar';
import Editor from './Editor';

export default function PageFrame({ navData, repository }) {
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
