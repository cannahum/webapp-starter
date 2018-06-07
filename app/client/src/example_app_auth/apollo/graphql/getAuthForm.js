import gql from 'graphql-tag';

export default gql`
  query {
    authForm @client {
      emailAddress,
      username,
      password,
      passwordConfirmation,
      profilePictureLink
    }
  }
`;
