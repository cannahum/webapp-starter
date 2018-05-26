import { Resolver, Query, Mutation, Field, ID, ObjectType, Arg } from 'type-graphql';

@ObjectType()
class ShoppingItem {
  @Field((type) => ID)
  public id: number;

  @Field()
  public itemName: string;

}

@Resolver()
export default class ShoppingListResolver {
  private list: ShoppingItem[] = [
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
  ];
  private nextId: number = this.list.length + 1;

  @Query((returns) => [ShoppingItem])
  public async shoppingList(): Promise<ShoppingItem[]> {
    return this.list;
  }

  @Mutation((returns) => ShoppingItem)
  public async addNewShoppingItem(@Arg('itemName') itemName: string): Promise<ShoppingItem> {
    const newItem = {
      id: this.nextId++,
      itemName,
    };
    this.list.push(newItem);
    return newItem;
  }
}
