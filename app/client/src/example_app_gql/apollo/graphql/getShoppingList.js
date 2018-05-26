import gql from 'graphql-tag';

export default gql`
  query {
    shoppingList {
      id,
      itemName
    }
  }
`;
