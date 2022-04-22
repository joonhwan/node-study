import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  //ResolverInterface,
} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../entity/User";
import { UserRegisterInput } from "./inputs/UserRegisterInput";

@Resolver((_of) => User)
export class UserResolver {
  @Query(() => String)
  async helloWorld(): Promise<string> {
    return "Hello World";
  }

  // @FieldResolver()
  // name(@Root() parent: User): string {
  //   return `${parent.firstName} ${parent.lastName}`;
  // }
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find({});
  }

  @Mutation(() => User)
  async register(@Arg("data") data: UserRegisterInput): Promise<User> {
    const { email, firstName, lastName, password } = data;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
    return user;
  }
}
