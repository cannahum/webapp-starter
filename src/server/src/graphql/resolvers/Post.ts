import {Resolver, Query, Mutation, Args, Arg, Ctx, Authorized} from 'type-graphql';
import {Repository, Connection} from 'typeorm';
import DB from '../../db/DB';
import {Post, VoteType} from '../../models/Post';
import {AuthLevel, Person} from '../../models/Person';
import {IAppContext, IAuthorizedAppContext} from '../../App';

const db = DB.getInstance();

@Resolver()
export default class PostResolver {

  @Authorized(String(AuthLevel.REGULAR))
  @Query((returns) => [Post])
  public async myPosts(@Ctx() ctx: IAuthorizedAppContext): Promise<Post[]> {
    const conn: Connection = await db.getConnection();
    const repo: Repository<Post> = conn.getRepository(Post);
    try {
      const {user} = ctx;
      return repo
        .createQueryBuilder('post')
        .where('post.user = ' + user.id)
        .getMany();
    }
    catch (e) {
      throw new Error(e);
    }
  }

  @Authorized()
  @Query((returns) => [Post])
  public async posts(): Promise<Post[]> {
    const conn: Connection = await db.getConnection();
    const repo: Repository<Post> = conn.getRepository(Post);
    try {
      return await repo.find();
    }
    catch (e) {
      throw new Error(e);
    }
  }

  @Authorized()
  @Mutation((returns) => Post)
  public async createPost(
    @Arg('caption', {nullable: false}) caption: string,
    @Arg('voteType', {nullable: false}) voteType: VoteType,
    @Ctx() ctx: IAuthorizedAppContext,
  ): Promise<Post> {
    const {user} = ctx;
    // Find the person object;
    const conn: Connection = await db.getConnection();
    const personRepo: Repository<Person> = conn.getRepository(Person);
    const person: Person | undefined = await personRepo.findOne(user.id);
    if (!person) {
      throw new Error('Could not find user with id: ' + user.id);
    }

    // Save the post
    const postRepo: Repository<Post> = conn.getRepository(Post);
    const p = new Post();
    p.caption = caption;
    p.voteType = voteType;
    p.user = person;
    return postRepo.save(p);
  }
}
