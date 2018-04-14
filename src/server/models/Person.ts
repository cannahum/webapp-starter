import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ID, Field, ObjectType, registerEnumType} from 'type-graphql';

export enum AccountType {
  email,
  google,
  facebook,
}

registerEnumType(AccountType, {
  name: 'AccountType',
  description: 'Email & Password, or Oauth perhaps...',
});

@ObjectType()
@Entity()
export class Person {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column({
    nullable: false,
    unique: true,
  })
  public emailAddress: string;

  @Field({nullable: true})
  @Column({
    nullable: true,
  })
  public profilePictureLink: string;

  @Field((type) => AccountType)
  @Column({
    nullable: false,
  })
  public username: string;

  @Field()
  @Column()
  public accountType: AccountType;
}
