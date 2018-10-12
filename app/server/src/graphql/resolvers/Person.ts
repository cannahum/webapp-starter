import { Repository, Connection } from 'typeorm';
import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IAppContext, IAuthorizedAppContext } from '../../App';
import DB from '../../db/DB';
import { AccountType, AuthLevel, Person } from '../../models/Person';
import { NewPersonInputData } from './args/NewPersonInputData';
import { LoginInputData } from './args/LoginInputData';

const db = DB.getInstance();

export interface IDecryptablePerson {
  id: number;
  username: string;
}

@Resolver()
export default class PersonResolver {

  @Authorized(String(AuthLevel.ADMIN))
  @Query((_returns) => [Person])
  public async users(): Promise<Person[]> {
    const conn: Connection = await db.getConnection();
    const repo: Repository<Person> = conn.getRepository(Person);
    try {
      return await repo.find();
    }
    catch (e) {
      throw new Error(e);
    }
  }

  @Authorized()
  @Query((_returns) => Person)
  public async me(@Ctx() ctx: IAuthorizedAppContext): Promise<Person> {
    const {user: {id}} = ctx;
    const conn: Connection = await db.getConnection();
    const repo: Repository<Person> = conn.getRepository(Person);
    const person: Person | undefined = await repo.findOne(id);
    if (person) {
      return person;
    }
    throw new Error('How come this person does not exist?!');
  }

  @Mutation((_returns) => Person)
  public async signup(@Arg('newPersonInput') inputData: NewPersonInputData): Promise<Person> {
    const {username, emailAddress, password, profilePictureLink} = inputData;
    const p = new Person();
    p.username = username;
    p.emailAddress = emailAddress;
    p.password = await bcrypt.hash(password, DB.COMPLIANCE.BCRYPT_SALT_ROUNDS);
    p.accountType = AccountType.EMAIL;
    p.profilePictureLink = profilePictureLink;
    p.authLevel = AuthLevel.REGULAR;

    try {
      const conn: Connection = await db.getConnection();
      const repo: Repository<Person> = conn.getRepository(Person);
      const saved: Person = await repo.save(p);
      // if this is the first ever person in the DB, then let's make them admin. Totally a DEV thing.
      if (saved.id === 1 && process.env.NODE_ENV === 'dev') {
        setImmediate(() => {
          const _ = repo.update(saved.id, { authLevel: AuthLevel.ADMIN});
        });
      }
      return saved;
    }
    catch (e) {
      throw new Error(e);
    }
  }

  @Mutation((_returns) => String)
  public async login(@Arg('loginInput') inputData: LoginInputData,
                     @Ctx() ctx: IAppContext): Promise<string> {
    // Find the user...
    let conn: Connection;
    try {
      conn = await db.getConnection();
    }
    catch (e) {
      throw new Error(e);
    }
    const repo: Repository<Person> = conn.getRepository(Person);
    const users: Person[] = await repo.find({
      emailAddress: inputData.emailAddress,
    });

    // There should only be one because it's unique.
    const user = users[0];
    if (!user) {
      throw new Error('User does not exist');
    }

    const valid: boolean = await bcrypt.compare(inputData.password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }

    return jwt.sign(
      {id: user.id, username: user.username} as IDecryptablePerson,
      ctx.APP_SECRET,
      {
        expiresIn: '1d',
      },
    );
  }
}
