import React from 'react';
import ReactDOM from 'react-dom';

import { parseURLData } from './utility';

import PageFrame from './page';
import navData from './index.json';

const { repository } = parseURLData();

ReactDOM.render(
  <PageFrame {...{ navData, repository }} />,
  document.getElementById('root')
);

window.addEventListener('unhandledrejection', event => {
  const { reason } = event;

  if (!(reason instanceof URIError)) return;

  event.preventDefault();

  window.alert(reason.message);
});
