import {Resolver, Query} from 'type-graphql';
import {Person} from '../../models/Person';

@Resolver()
class PersonResolver {
  private readonly personCollection: Person[] = [
  ];

  @Query((returns) => [Person])
  public async users(): Promise<Person[]> {
    return this.personCollection;
  }
}
