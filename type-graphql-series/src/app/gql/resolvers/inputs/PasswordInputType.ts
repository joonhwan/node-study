import { Field, InputType } from "type-graphql";
import { Min } from "class-validator";

@InputType()
export class PasswordInputType {
  @Field()
  @Min(5)
  password: string;
}
