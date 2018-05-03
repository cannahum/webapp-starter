import {Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Field, ID, ObjectType} from 'type-graphql';
import {Person} from './Person';

export enum VoteType {
  UP_DOWN,
  MULTIPLE_CHOICE,
}

@ObjectType()
@Entity()
export class Post {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public caption: string;

  @Field()
  @Column({
    nullable: false,
  })
  public voteType: VoteType;

  @Field((type) => Person)
  @ManyToOne((type) => Person, (user) => user.posts, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  public user: Person;
}
