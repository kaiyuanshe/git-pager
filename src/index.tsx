import React from 'react';
import ReactDOM from 'react-dom';
import { parseCookie, parseURLData } from './utility';

import Application from './page';

import navData from './index.json';
import ApplicationModel from './model';

const { token, repository }: any = { ...parseCookie(), ...parseURLData() };

const store = new ApplicationModel(token);

ReactDOM.render(
  <Application {...{ navData, repository, store }} />,
  document.getElementById('root')
);

store.signIn();

window.addEventListener('unhandledrejection', event => {
  const { reason } = event;

  if (!(reason instanceof URIError)) return;

  event.preventDefault();

  window.alert(reason.message);
});

if (['localhost', '127.0.0.1'].includes(window.location.hostname) === false)
  window.addEventListener(
    'beforeunload',
    event => (event.returnValue = 'Exit ?')
  );
