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

const ME = gql`
  {
    me {
      username,
      emailAddress,
      authLevel,
      profilePictureLink
    }
  }
`;

class Auth extends React.Component {

  render() {
    const { location: { pathname } } = this.props;
    const getAuthLinks = (isLoggedIn) => {
      if (isLoggedIn) {
        return (
          <Query query={ME}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Loading/>;
              }
              if (error || !data.me) {
                return <p>No ME object: {error.message}</p>
              }
              const { me: { username, authLevel, profilePictureLink } } = data;
              return (
                <div>
                  <div id="me-wrapper">
                    <div id="me-profile-picture-wrapper">
                      <img src={profilePictureLink || "http://via.placeholder.com/350x150"}
                           alt="profilePictureLink"
                           id="me-profile-picture"/>
                    </div>
                    <div id="me-content-writings">
                      <p>{username}</p>
                      <p>Authorization Power: {authLevel}</p>
                    </div>
                  </div>
                  <Link to={'/auth/posts'}>Get Posts (only if you're logged in)</Link>
                </div>
              );
            }}
          </Query>
        );
      }

      return (
        <div>
          {pathname.indexOf('/auth/login') === -1
            ? (
              <p>
                <Link to={'/auth/login'}>Log In</Link>
              </p>
            ) : null
          }
          {pathname.indexOf('/auth/signup') === -1
            ? (
              <p>
                <Link to={'/auth/signup'}>Sign Up</Link>
              </p>
            ) : null
          }
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

export default withRouter(Auth);
