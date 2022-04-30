import { Field, InputType } from "type-graphql";
import { PasswordInputType } from "@/app/gql/resolvers/inputs/PasswordInputType";

@InputType()
export class ChangePasswordInput extends PasswordInputType {
  @Field()
  token: string;
}
