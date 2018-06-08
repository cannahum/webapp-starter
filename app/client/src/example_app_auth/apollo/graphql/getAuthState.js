import gql from 'graphql-tag';

export default gql`
  query {
    auth @client {
      isLoggedIn,
      authToken
    }
  }
`;
