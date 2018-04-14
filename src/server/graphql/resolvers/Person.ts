import {Resolver, Query} from 'type-graphql';
import DB from '../../db/DB';
import {Person} from '../../models/Person';
import {Repository, Connection} from 'typeorm';

@Resolver()
class PersonResolver {

  @Query((returns) => [Person])
  public async users(): Promise<Person[]> {
    const db = DB.getInstance();
    const conn: Connection = await db.getConnection();
    const repo: Repository<Person> = conn.getRepository(Person);
    try {
      return await repo.find();
    }
    catch (e) {
      throw new Error(e);
    }
  }
}
