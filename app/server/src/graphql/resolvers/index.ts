import PersonResolver from './Person';
import PostResolver from './Post';
import ShoppingListResolver from './Shopping';

let resolvers: any = {
  PersonResolver,
  PostResolver,
};

if (process.env.NODE_ENV === 'dev') {
  // resolvers['ShoppingListResolver'] = ShoppingListResolver;
  resolvers = {
    ...resolvers,
    ShoppingListResolver,
  };
}

export {
  resolvers,
};
