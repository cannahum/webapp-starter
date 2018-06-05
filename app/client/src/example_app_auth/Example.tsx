import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Route, Router } from 'react-router-dom';
import { History as HHistory } from 'history';
import createHistory from 'history/createBrowserHistory';
import Home from './components/Home';
import { createClient } from './apollo/client';

import './example.scss';
import { IMandatoryProps } from '../App';

interface IExampleProps extends IMandatoryProps {
  history?: HHistory;
}

export default class Example extends React.Component<IExampleProps> {
  private readonly history: HHistory;
  private readonly apolloClient: ApolloClient<any>;

  constructor(props: IExampleProps) {
    super(props);
    this.history = this.props.history || createHistory();
    this.apolloClient = createClient();
  }

  public render() {

    const getChildren = (): JSX.Element => (
      <Route>
        <div>
          <Home {...this.props}/>
        </div>
      </Route>
    );

    return (
      <ApolloProvider client={this.apolloClient}>
        <div>
          {this.props.history
            ? (
              getChildren()
            )
            : (
              <Router history={this.history}>
                {getChildren()}
              </Router>
            )
          }
        </div>
      </ApolloProvider>
    );
  }
}
