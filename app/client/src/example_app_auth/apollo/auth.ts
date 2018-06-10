import { StoreObject } from 'apollo-cache-inmemory';
import { ClientStateConfig } from 'apollo-link-state';
import { isNullOrUndefined } from 'util';
import getAuthForm from './graphql/getAuthForm';
import { ApolloLink, Operation, NextLink } from 'apollo-link';

export interface IAuthState extends StoreObject {
  isLoggedIn: boolean;
  authToken?: string;
}

export interface IAuthForm extends StoreObject {
  emailAddress: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  profilePictureLink?: string;
}

const authResolvers = {
  Mutation: {
    updateForm: (_: any, { key, value }: any, context: any) => {
      console.log('authResolvers::updateform');
      const { cache } = context;
      if (cache) {
        const previousState = cache.readQuery({ query: getAuthForm });
        const authForm: IAuthForm = previousState.authForm || {};
        authForm[ key ] = value;
        const data = {
          ...previousState,
          authForm,
        };

        cache.writeData({ data });
      }
    },
  },
  Query: {
    isLoggedIn: () => {
      debugger;
    },
  },
};

let authToken: string;
export const initAuthToken = (token: string): void => {
  authToken = token;
};

// One more link for once we have the auth token for the user.
export const authLink = new ApolloLink(((operation: Operation, forward?: NextLink) => {
  operation.setContext(({ headers }: any) => {
    if (!isNullOrUndefined(authToken)) {
      return {
        headers: {
          ...headers,
          authorization: authToken,
        },
      };
    }
  });
  return forward ? forward(operation) : null;
}));

const auth: ClientStateConfig = {
  defaults: {
    authForm: {
      __typename: 'AuthForm',
      emailAddress: '',
      password: '',
      passwordConfirmation: '',
      profilePictureLink: '',
      username: '',
    } as IAuthForm,
    auth: {
      isLoggedIn: false,
      authToken: '',
      __typename: 'AuthState',
    } as IAuthState,
  },
  resolvers: authResolvers,
};

export default auth;
