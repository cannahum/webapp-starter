import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState, ClientStateConfig } from 'apollo-link-state';
import { createHttpLink } from 'apollo-link-http';
import { StoreObject, InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';
import auth, { IAuthState } from './auth';
import counter, { ICounterState } from './counter';

export interface IAppState extends StoreObject {
  auth: IAuthState;
  counter: ICounterState;
}

const httpLink: ApolloLink = createHttpLink({
  uri: '/graphql',
});

const cache = new InMemoryCache() as ApolloCache<NormalizedCacheObject>;
const state: ClientStateConfig = {
  ...auth,
  ...counter,
};

export const createClient = (): ApolloClient<IAppState> => {
  return new ApolloClient<any>({
    cache,
    link: ApolloLink.from([
      withClientState(state),
      httpLink,
    ]),
  });
};
