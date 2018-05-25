import { StoreObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ClientStateConfig } from 'apollo-link-state';
import getCounter from './graphql/getCounter';

const counterResolvers = {
  Mutation: {
    updateCounter: (x, { value }, context) => {
      const cache = context.cache;
      const previousState = cache.readQuery({ query: getCounter});
      const data = {
        ...previousState,
        counter: {
          ...previousState.counter,
          currentCount: previousState.counter.currentCount + value,
        },
      };

      cache.writeData({ data });
      return null;
    },
  }
};

const counter = {
  defaults: {
    counter: {
      currentCount: 0,
      __typename: 'CounterState',
    }
  },
  resolvers: counterResolvers,
};

export default counter;
