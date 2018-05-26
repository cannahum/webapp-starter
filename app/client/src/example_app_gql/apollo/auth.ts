import { StoreObject } from 'apollo-cache-inmemory';
import { ClientStateConfig } from 'apollo-link-state';

export interface IAuthState extends StoreObject {
  loggedIn: boolean;
  authToken?: string;
}

const authResolvers = {
  Mutation: {
    signup: (_: any, y: any, z: any) => {
      console.log(y);
      console.log(z);
    },

    login: () => {

    }
  },
  Query: {
    isLoggedIn: () => {

    }
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
