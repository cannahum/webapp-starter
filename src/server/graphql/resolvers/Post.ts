import {Resolver, Query, Mutation, Args, Arg} from 'type-graphql';
import {Repository, Connection} from 'typeorm';
import DB from '../../db/DB';
import {Post} from '../../models/Post';

@Resolver()
class PostResolver {

  Query((returns) => [Post])
  public async
}