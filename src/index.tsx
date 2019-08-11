import 'core-js/es/object/from-entries';
// @ts-ignore
import { auto } from 'browser-unhandled-rejection';

import React from 'react';
import ReactDOM from 'react-dom';
import { parseCookie, parseURLData } from './utility';

import Application from './page';

import navData from './index.json';
import ApplicationModel from './model';

auto();

const { token, repository }: any = { ...parseCookie(), ...parseURLData() };

const store = new ApplicationModel(token);

ReactDOM.render(
  <Application {...{ navData, repository, store }} />,
  document.getElementById('root')
);

store.signIn();

window.addEventListener('unhandledrejection', event => {
  const { reason } = event;

  event.preventDefault();

  window.alert(reason.message || reason);
});

if (['localhost', '127.0.0.1'].includes(window.location.hostname) === false)
  window.addEventListener(
    'beforeunload',
    event => (event.returnValue = 'Exit ?')
  );
