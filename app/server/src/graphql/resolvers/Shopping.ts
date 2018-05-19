import { Resolver, Query, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class ShoppingItem {
  @Field((type) => ID)
  public id: number;

  @Field()
  public itemName: string;

}

@Resolver()
export default class ShoppingListResolver {

  @Query((returns) => [ShoppingItem])
  public async shoppingList(): Promise<any> {
    return Promise.resolve([
      {
        id: 1,
        itemName: 'candy',
      },
      {
        id: 2,
        itemName: 'peanut butter',
      },
      {
        id: 3,
        itemName: 'jelly',
      },
    ]);
  }
}
