import gql from 'graphql-tag';

export default gql`
  mutation logout {
    logout @client {
      isLoggedIn
    }
  }
`;
