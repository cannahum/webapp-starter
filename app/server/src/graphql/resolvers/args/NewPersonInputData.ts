import { Field, InputType } from 'type-graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewPersonInputData {

  @Field()
  @MaxLength(30)
  public username: string;

  @Field()
  @IsEmail()
  public emailAddress: string;

  @Field()
  @MinLength(8)
  public password: string;

  @Field({nullable: true})
  public profilePictureLink: string;
}
