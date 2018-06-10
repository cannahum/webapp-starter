import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import Loading from './Loading';

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

export default ({history}) => {
  return (
    <Query query={ME} >
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading/>;
        }
        if (error || !data.me) {
          setTimeout(() => history.push('/auth/login'), 0);
          return null;
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
