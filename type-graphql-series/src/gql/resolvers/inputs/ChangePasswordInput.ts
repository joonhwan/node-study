import {Field, InputType} from "type-graphql";
import {PasswordInput} from "@/gql/resolvers/inputs/PasswordInput";

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
