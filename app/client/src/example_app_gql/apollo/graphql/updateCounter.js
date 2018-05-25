import gql from 'graphql-tag';

export default gql`
  mutation updateCounter($value: Int!) {
    updateCounter(value: $value) @client {
      currentCount
    }
  }
`;
