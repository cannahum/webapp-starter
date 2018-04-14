import {buildSchema} from 'type-graphql';
import {GraphQLSchema} from 'graphql';
import {resolve} from 'path';

const resolverPath: string = resolve(__dirname, './resolvers') + '/**/*.ts';

export default function(): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: [resolverPath],
  });
}
