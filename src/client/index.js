import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './example_components/App';

ReactDOM.render(
  <App/>,
  document.getElementById('target'),
);
