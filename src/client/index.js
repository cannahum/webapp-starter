import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.scss';
import {default as ExampleApp} from './example_app/App';
import {store} from "./example_app/redux";

ReactDOM.render(
  <Provider store={store}>
    <ExampleApp/>
  </Provider>,
  document.getElementById('target'),
);
