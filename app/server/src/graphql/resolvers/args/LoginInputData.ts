import { Field, InputType } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginInputData {

  @Field()
  @IsEmail()
  public emailAddress: string;

  @Field()
  @MinLength(8)
  public password: string;
}
