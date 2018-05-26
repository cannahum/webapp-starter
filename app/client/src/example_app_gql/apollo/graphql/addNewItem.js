import gql from 'graphql-tag';

export default gql`
  mutation addNewShoppingItem($itemName: String!) {
    addNewShoppingItem(itemName: $itemName) {
      id
      itemName
    }
  }
`;
