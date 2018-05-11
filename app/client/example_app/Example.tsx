import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { ConnectedRouter, push } from 'react-router-redux';
import { store, history } from './redux';
import Home from './components/Home';

import './example.scss';

export default class Example extends React.Component<{}, {}> {

  public render() {

    return (
      <Provider store={store}>
        {/*<ConnectedRouter history={history}>*/}
        <Router history={history}>
          {/*<Home/>*/}
          <Route render={() => <Home/>}/>
          {/*</ConnectedRouter>*/}
        </Router>
      </Provider>
    );
  }
}
