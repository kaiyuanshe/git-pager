import 'core-js/es/object/from-entries';
// @ts-ignore
import { auto } from 'browser-unhandled-rejection';
import { render } from 'react-dom';
import { parseURLData, serviceWorkerUpdate } from 'web-utility';

import navData from './index.json';
import ApplicationModel from './model';
import { Application } from './page';
import { parseCookie } from './utility';

auto();

const { serviceWorker } = window.navigator,
  NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV !== 'development')
  serviceWorker
    ?.register('sw.js')
    .then(serviceWorkerUpdate)
    .then(worker => {
      if (window.confirm('New version of this Web App detected, update now?'))
        worker.postMessage({ type: 'SKIP_WAITING' });
    });

serviceWorker?.addEventListener('controllerchange', () =>
  window.location.reload()
);

const { token, repository }: any = { ...parseCookie(), ...parseURLData() };

const store = new ApplicationModel(token);

render(
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
