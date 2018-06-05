import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import Loading from './Loading';

const IS_LOGGED_IN = gql`
  {
    auth @client {
      isLoggedIn
    }
  }
`;

export default class Auth extends React.Component {

  render() {
    const getAuthLinks = (isLoggedIn) => {
      if (isLoggedIn) {
        return <Link to={'/logout'}>Log Out</Link>;
      }

      return (
        <div>
          <p>
            <Link to={'/auth/login'}>Log In</Link>
          </p>
          <p>
            <Link to={'/auth/signup'}>Sign Up</Link>
          </p>
        </div>
      );
    };

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
              <div>
                {getAuthLinks(isLoggedIn)}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
