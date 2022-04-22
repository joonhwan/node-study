import { IsEmail, Length } from "class-validator";
import { isEmailAlreadyExists } from "@/validators/isEmailAreadyExists";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserRegisterInput {
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

  @Field()
  password: string;
}
