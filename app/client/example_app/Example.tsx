import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { History as HHistory } from 'history';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, push } from 'react-router-redux';
import { IApplicationState, storeCreator } from './redux';
import { IMandatoryProps } from '../App';
import Home from './components/Home';

import './example.scss';

interface IExampleProps extends IMandatoryProps {
  history?: HHistory;
}

export default class Example extends React.Component<IExampleProps> {
  private store: Store<IApplicationState>;
  private history: HHistory;

  constructor(props: IExampleProps) {
    super(props);
    const history = this.history = this.props.history || createHistory();
    const store = this.store = storeCreator(history);
  }

  public render() {
    return (
      <Provider store={this.store}>
        {this.props.history
          ? (
            <Route render={() => <Home {...this.props}/>}/>
          ) : (
            <Router history={this.history}>
              {/*<ConnectedRouter history={history}>*/}
              {/*<Home/>*/}
              <Route render={() => <Home {...this.props}/>}/>
              {/*</ConnectedRouter>*/}
            </Router>
          )
        }
      </Provider>
    );
  }
}
