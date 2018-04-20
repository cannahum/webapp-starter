import {Repository, Connection} from 'typeorm';
import {Resolver, Query, Mutation, Arg, Ctx, Authorized} from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {AppContext, AuthorizedAppContext} from "../../App";
import DB from '../../db/DB';
import {AccountType, AuthLevel, Person} from '../../models/Person';
import {NewPersonInputData} from './args/NewPersonInputData';
import {LoginInputData} from './args/LoginInputData';

const db = DB.getInstance();

export interface DecryptablePerson {
  id: number;
  username: string;
}

@Resolver()
class PersonResolver {

  @Authorized(String(AuthLevel.ADMIN))
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

  @Authorized()
  @Query((returns) => Person)
  public async me(@Ctx() ctx: AuthorizedAppContext): Promise<Person> {
    const {user: {id}} = ctx;
    const conn: Connection = await db.getConnection();
    const repo: Repository<Person> = conn.getRepository(Person);
    const person: Person | undefined = await repo.findOneById(id);
    if (person) {
      return person;
    }
    throw new Error('How come this person does not exist?!');
  }

  @Mutation((returns) => Person)
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
      return await repo.save(p);
    }
    catch (e) {
      throw new Error(e);
    }
  }

  @Mutation((returns) => String)
  public async login(@Arg('loginInput') inputData: LoginInputData,
                     @Ctx() ctx: AppContext): Promise<string> {
    // Find the user...
    let conn: Connection;
    try {
      conn = await db.getConnection();
    }
    catch (e) {
      throw new Error(e);
    }
    const repo: Repository<Person> = conn.getRepository(Person);
    let users: Person[] = await repo.find({
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

    const token: string = jwt.sign({
        id: user.id,
        username: user.username,
      } as DecryptablePerson, ctx.APP_SECRET,
      {
        expiresIn: '1d'
      });

    return token;
  }
}
