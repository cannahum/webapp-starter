import {AuthChecker, buildSchema} from 'type-graphql';
import {GraphQLSchema} from 'graphql';
import {authorizer} from '../middleware/authorizer';
import {resolvers} from './resolvers/';

export default function(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: Object.values(resolvers),
    authChecker: authorizer as AuthChecker,
  });
}
