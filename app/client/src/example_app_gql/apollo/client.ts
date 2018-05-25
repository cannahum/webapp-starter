import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState, ClientStateConfig } from 'apollo-link-state';
import { createHttpLink } from 'apollo-link-http';
import { StoreObject, InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';
import auth, { IAuthState } from './auth';
import counter from './counter';

const httpLink: ApolloLink = createHttpLink({
  uri: '/graphql',
});

const cache = new InMemoryCache() as ApolloCache<NormalizedCacheObject>;
const state = {
  ...auth,
  ...counter,
  cache,
};
const stateLink: ApolloLink = withClientState(state);

export const createClient = (): ApolloClient<any> => {
  return new ApolloClient<any>({
    cache,
    link: ApolloLink.from([
      stateLink,
      httpLink,
    ]),
  });
};
