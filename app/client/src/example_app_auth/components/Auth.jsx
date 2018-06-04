import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Query, graphql, compose } from 'react-apollo';
import Loading from './Loading';

const IS_LOGGED_IN = gql`
  {
    me {
      id
      auth @client {
        isLoggedIn
      }
    }
  }
`;

export default class Auth extends React.Component {

  render() {
    return (
      <Query query={IS_LOGGED_IN}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading/>;
          }
          let isLoggedIn = false;
          if (data) {
            ({ auth: { isLoggedIn } } = data);
          }
          return (
            <div>
              <p>Authentication can be checked multiple ways...</p>
              <p>Internal State says that we are <b>{isLoggedIn ? 'Logged In!' : 'Not Logged In'}</b></p>
            </div>
          );
        }}
      </Query>
    );
  }
}

// export default compose(
//   graphql(IS_LOGGED_IN, {
//     props: ({ data }) => {
//       if (data) {
//         const { auth } = data;
//         return {
//           auth
//         }
//       }
//     }
//   })
// )(Auth);
