import { ClassType, Field, InputType } from "type-graphql";

class Empty {}

export function PasswordInput<T extends ClassType>(BaseClass: T) {
  @InputType({ isAbstract: true })
  class PasswordTrait extends BaseClass {
    @Field(() => String)
    password!: string;
  }
  return PasswordTrait;
}
