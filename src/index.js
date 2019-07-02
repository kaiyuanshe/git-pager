import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Editor from './page/Editor';

const repository = new URLSearchParams(window.location.search).get(
  'repository'
);

ReactDOM.render(
  <Editor repository={repository} />,
  document.getElementById('root')
);
