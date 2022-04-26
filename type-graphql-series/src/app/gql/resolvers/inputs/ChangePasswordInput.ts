import {Field, InputType} from "type-graphql";
import {PasswordInput} from "@/app/gql/resolvers/inputs/PasswordInput";

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
