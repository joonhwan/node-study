import { IsEmail, Length } from "class-validator";
import { isEmailAlreadyExists } from "@/app/gql/validators/isEmailAreadyExists";
import { Field, InputType } from "type-graphql";
import { PasswordInput } from "@/app/gql/resolvers/mixins";
// import {PasswordInputType} from "@/gql/resolvers/inputs/PasswordInputType";

@InputType()
export class UserCreateInputType extends PasswordInput(class {}) {
  @Field()
  @Length(1, 255, { message: "1글자 ~ 255글자 여야 하는데요." })
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @isEmailAlreadyExists()
  email: string;
}
