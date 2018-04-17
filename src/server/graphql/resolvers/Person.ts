import {Resolver, Query, Mutation, Args, Arg} from 'type-graphql';
import {Repository, Connection} from 'typeorm';
import DB from '../../db/DB';
import {AccountType, AuthLevel, Person} from '../../models/Person';
import {NewPersonInputData} from './args/NewPersonInputData';

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

  @Mutation((returns) => Person)
  public async signup(@Arg('newPersonInput') inputData: NewPersonInputData): Promise<Person> {
    const {username, emailAddress, password, profilePictureLink} = inputData;
    const p = new Person();
    p.username = username;
    p.emailAddress = emailAddress;
    p.password = password;
    p.accountType = AccountType.EMAIL;
    p.profilePictureLink = profilePictureLink;
    p.authLevel = AuthLevel.REGULAR;

    const db = DB.getInstance();
    try {
      const conn: Connection = await db.getConnection();
      const repo: Repository<Person> = conn.getRepository(Person);
      return await repo.save(p);
    }
    catch (e) {
      throw new Error(e);
    }
  }
}
