import React from 'react';
import './example.scss';

import SignUp from './components/SignUp';
import Login from './components/LogIn';
import { Provider } from 'react-redux';
import { store } from './redux';

export default class Example extends React.Component<{}, {}> {
  public render() {
    return (
      <Provider store={store}>
        <div id="example-app-wrapper">
          <div id="example-app-header">
            <h1>Welcome To The Full Stack App Starter!</h1>
          </div>
          <div id="example-app-content">
            <p>
              In this example, you will be able to see the full flow that already exists as an example app
            </p>
            <p>
              Create a user, or login with an existing user. If you've configured the DB connection correctly,
              this should work. Then create posts.
            </p>
            <div>
              <SignUp/>
            </div>
            <div>
              <Login/>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}
