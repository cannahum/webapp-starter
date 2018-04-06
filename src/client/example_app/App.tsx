import React from 'react';
import AsyncComp from './components/AsyncComp';
import Counter from './components/CounterConnected';
import Link from './components/Link';

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div id="main-app-wrapper">
        <h1>Welcome To The Full Stack App Starter!</h1>
        <AsyncComp/>
        <div>
          <Counter/>
        </div>
        <Link>Hover over me</Link>
      </div>
    );
  }
}
