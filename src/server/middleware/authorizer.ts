import {AuthChecker} from "type-graphql";
import {AppContext} from "../App";
import DB from '../db/DB';
import {AuthLevel, Person} from "../models/Person";
import {Connection, Repository} from "typeorm";

const db = DB.getInstance();

export const authorizer: AuthChecker<AppContext> = async ({root, args, context, info}, roles): Promise<boolean> => {
  const {user} = context;
  // If user is in the context, it means they are authenticated.
  if (!user) {
    return false;
  }
  // If it's just authentication, then we can check that without DB
  const onlyAuthentication = roles.length === 0;
  // only regular users is also just only authentication.
  const onlyRegularUsers = roles.length === 1 && roles[0] === String(AuthLevel.REGULAR);
  if (onlyAuthentication || onlyRegularUsers) {
    return true;
  }
  // Otherwise, check the db value
  const conn: Connection = await db.getConnection();
  const repo: Repository<Person> = conn.getRepository(Person);
  const person: Person | undefined = await repo.findOne(user.id);
  if (!person) {
    return false;
  }
  return roles.includes(String(person.authLevel));
};
