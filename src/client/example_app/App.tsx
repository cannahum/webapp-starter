import React from 'react';
import {Provider} from 'react-redux';
import AsyncComp from './components/AsyncComp';
import Counter from './components/CounterConnected';
import Link from './components/Link';
import {store} from './redux';
import './example.scss';

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Provider store={store}>
        <div id="example-app-wrapper">
          <h1>Welcome To The Full Stack App Starter!</h1>
          <AsyncComp/>
          <div>
            <Counter/>
          </div>
          <Link>Hover over me</Link>
        </div>
      </Provider>
    );
  }
}
