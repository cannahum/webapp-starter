import React from 'react';
import gql from 'graphql-tag';
import { Link, withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import Loading from './Loading';

const IS_LOGGED_IN = gql`
  {
    auth @client {
      isLoggedIn
    }
  }
`;

class Auth extends React.Component {

  render() {
    const { location: { pathname } } = this.props;

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
              <p>Welcome to the Authentication App.</p>
              <p>
                For this one, you need to make sure that the GraphQL
                server is up and running and connected to a database.
                Sign up, log in, and log out!
              </p>
              <p>Internal State says that we are <b>{isLoggedIn ? 'Logged In!' : 'Not Logged In'}</b></p>
              {
                isLoggedIn
                  ? <Link to="/auth/logout">Log out</Link>
                  : null
              }
              <div>
                {pathname.indexOf('/auth/login') === -1 && !isLoggedIn
                  ? (
                    <p>
                      <Link to={'/auth/login'}>Log In</Link>
                    </p>
                  ) : null
                }
                {pathname.indexOf('/auth/signup') === -1 && !isLoggedIn
                  ? (
                    <p>
                      <Link to={'/auth/signup'}>Sign Up</Link>
                    </p>
                  ) : null
                }
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Auth);
