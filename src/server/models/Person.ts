import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ID, Field, ObjectType, registerEnumType} from 'type-graphql';
import {Post} from './Post';

export enum AccountType {
  EMAIL,
  GOOGLE,
  FACEBOOK,
}

export enum AuthLevel {
  REGULAR,
  ADMIN,
}

registerEnumType(AccountType, {
  name: 'AccountType',
  description: 'Email & Password, or Oauth perhaps...',
});

registerEnumType(AuthLevel, {
  name: 'AuthLevel',
  description: 'Regular or Admin',
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

  @Field()
  @Column({
    nullable: false,
    unique: true,
  })
  public username: string;

  @Column({
    nullable: true,
  })
  public password: string;

  @Field((type) => AccountType)
  @Column()
  public accountType: AccountType;

  @Field((type) => AuthLevel)
  @Column()
  public authLevel: AuthLevel;

  @Field((type) => [Post])
  @OneToMany((type) => Post, (post) => post.user)
  public posts: Promise<Post[]>;
}
