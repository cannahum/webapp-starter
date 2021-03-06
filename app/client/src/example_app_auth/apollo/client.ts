import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { withClientState, ClientStateConfig } from 'apollo-link-state';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';
import auth, { authLink, IAuthState } from './auth';

const cache = new InMemoryCache() as ApolloCache<NormalizedCacheObject>;
const state = {
  ...auth,
  cache,
};
const stateLink: ApolloLink = withClientState(state);
const httpLink: ApolloLink = createHttpLink({
  uri: '/graphql',
});

export const createClient = (): ApolloClient<any> => {
  return new ApolloClient<any>({
    cache,
    link: ApolloLink.from([
      stateLink,
      authLink,
      httpLink,
    ]),
  });
};
