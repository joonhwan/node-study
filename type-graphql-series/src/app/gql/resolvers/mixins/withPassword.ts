import {ClassType, Field, InputType} from "type-graphql";

export default function withPassword<T extends ClassType>(BaseClass: T) {
  @InputType({isAbstract: true})
  class PasswordTrait extends BaseClass {
    @Field(() => String)
    password!: string
  }
  return PasswordTrait;
}