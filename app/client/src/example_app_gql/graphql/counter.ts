import { StoreObject } from 'apollo-cache-inmemory';
import { ClientStateConfig } from 'apollo-link-state';

export interface ICounterState extends StoreObject {
  currentCount: number;
}

const counterResolvers = {
  mutation: {
    increment: (x: any, y: any, z: any) => {
      console.log(x);
      console.log(y);
      console.log(z);
    },
  },
  query: {
    getCount: (x: any, y: any, z: any) => {
      console.log(x);
      console.log(y);
      console.log(z);
    },
  },
};

const counter: ClientStateConfig = {
  defaults: {
    currentCount: 0,
    __typename: 'CounterState',
  } as ICounterState,
  resolvers: counterResolvers,
};

export default counter;
