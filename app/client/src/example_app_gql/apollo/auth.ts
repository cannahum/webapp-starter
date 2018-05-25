import { StoreObject } from 'apollo-cache-inmemory';
import { ClientStateConfig } from 'apollo-link-state';

export interface IAuthState extends StoreObject {
  loggedIn: boolean;
  authToken?: string;
}

const authResolvers = {
  Mutation: {
    increment: (x: any, y: any, z: any) => {
      console.log(x);
      console.log(y);
      console.log(z);
    },
  },
  Query: {
    getCount: (x: any, y: any, z: any) => {
      console.log(x);
      console.log(y);
      console.log(z);
    },
  },
};

const auth: ClientStateConfig = {
  defaults: {
    loggedIn: false,
    __typename: 'AuthState',
  } as IAuthState,
  resolvers: authResolvers,
};

export default auth;
