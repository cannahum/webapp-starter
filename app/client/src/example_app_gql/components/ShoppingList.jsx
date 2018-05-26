import React from 'react';
import { graphql, compose } from 'react-apollo';
import Loading from './Loading';
import getShoppingList from '../apollo/graphql/getShoppingList';
import addNewItem from '../apollo/graphql/addNewItem';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.submitShoppingItem = this.submitShoppingItem.bind(this);
  }
  submitShoppingItem() {
    const input = this.refs['shoppingListInputRef'];
    const itemName = input.value;
    if (itemName) {
      this.props.addNewItem({
        variables: {
          itemName
        },
        refetchQueries: ['getShoppingList']
      });
    }
  }

  render() {
    const { data: { shoppingList, loading, error } } = this.props;
    const getShoppingItems = () => (
      shoppingList.map((item) => (
        <div className="shopping-item-wrapper" key={item.id}>
          <p>{item.itemName}</p>
        </div>
      ))
    );
    const getShoppingForm = () => {
      return (
        <div className="shopping-item-wrapper form">
          <p>Add a new Item</p>
          <input ref="shoppingListInputRef" type="text" id="shopping-item-input" />
          <button id="shopping-item-submit" onClick={this.submitShoppingItem}>Submit</button>
        </div>
      );
    }
    return (
      <div>
        <h2>ShoppingList Component</h2>
        <p>
          This Component interacts with the server for some shopping list data query and mutation.
          The server is okay with serving it since, no auth is needed for this entity.
          </p>
        <p>Checkout server/src/graphql/resolvers/Shopping.ts for more info</p>
        {loading
          ? <Loading />
          : getShoppingItems()}
        {!loading && getShoppingForm()}
      </div>
    )
  };
}

export default compose(
  graphql(addNewItem, {
    name: 'addNewItem'
  }),
  graphql(getShoppingList),
)(ShoppingList);
