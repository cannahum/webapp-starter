import gql from 'graphql-tag';

export default gql`
  query {
    counter @client {
      currentCount
    }
  }
`;
