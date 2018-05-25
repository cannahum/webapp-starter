import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Route, Router } from 'react-router-dom';
import { History as HHistory } from 'history';
import createHistory from 'history/createBrowserHistory';
import Home from './components/Home';
import { createClient, IAppState } from './apollo/client';

import './example.scss';
import { IMandatoryProps } from '../App';

interface IExampleProps extends IMandatoryProps {
  history?: HHistory;
}

export default class Example extends React.Component<IExampleProps> {
  private readonly history: HHistory;
  private readonly apolloClient: ApolloClient<IAppState>;

  constructor(props: IExampleProps) {
    super(props);
    this.history = this.props.history || createHistory();
    this.apolloClient = createClient();
  }

  public render() {

    return (
      <ApolloProvider client={this.apolloClient}>
        <div>
          {this.props.history
            ? (
              <Route render={() => <Home {...this.props}/>}/>
            ) : (
              <Router history={this.history}>
                <Route render={() => <Home {...this.props}/>}/>
              </Router>
            )
          }
          Hello, graphql app.
        </div>
      </ApolloProvider>
    );
  }
}
