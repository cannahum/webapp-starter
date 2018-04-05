import React from 'react';
import AsyncComp from './AsyncComp';
import Counter from './CounterConnected';

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div id="main-app-wrapper">
        <h1>Welcome To The Full Stack App Starter!</h1>
        <AsyncComp/>
        <div>
          <Counter/>
        </div>
      </div>
    );
  }
}
