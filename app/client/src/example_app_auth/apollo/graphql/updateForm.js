import gql from 'graphql-tag';

export default gql`
  mutation updateForm($field: String!, $value: Int!) {
    updateForm(key: $field, value: $value) @client {
      currentCount
    }
  }
`;
