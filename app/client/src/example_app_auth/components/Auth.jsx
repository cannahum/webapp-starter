import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Query, graphql, compose } from 'react-apollo';
import Loading from './Loading';

const IS_LOGGED_IN = gql`
  query {
    auth @client {
      isLoggedIn
    }
  }
`;

class Auth extends React.Component {

  render() {
    return (
      <Query query={IS_LOGGED_IN}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading/>;
          }
          return <div>What's up guys</div>;
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(IS_LOGGED_IN, {
    props: ({ data }) => {
      if (data) {
        const { auth } = data;
        return {
          auth
        }
      }
    }
  })
)(Auth);
