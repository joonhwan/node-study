import { IsEmail, Length } from "class-validator";
import { isEmailAlreadyExists } from "@/gql/validators/isEmailAreadyExists";
import { Field, InputType } from "type-graphql";
import {PasswordInput} from "@/gql/resolvers/inputs/PasswordInput";

@InputType()
export class UserRegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255, { message: "1글자~  255글자 여야 하하는는데데요." })
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @isEmailAlreadyExists()
  email: string;
}
