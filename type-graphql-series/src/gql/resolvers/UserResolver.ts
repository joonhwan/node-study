import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware,} from "type-graphql";
import * as bcrypt from "bcryptjs";
import {User} from "@/entity/User";
import {UserRegisterInput} from "./inputs/UserRegisterInput";
import {isAuth} from "@/gql/middleware/isAuth";
import {MyContext} from "@/gql/types/MyContext";
import {logger} from "@/gql/middleware/logger";


@Resolver((_of) => User)
export class UserResolver {
  // @Authorized()
  @UseMiddleware(logger, isAuth)
  @Query(() => String)
  async hello(@Ctx() context: MyContext): Promise<string> {
    const {userName  } = context.req.session;
    return `안녕하세요. 인증된 사용네요~~ 반가워요. ${userName} 님!`;
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
    return await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
  }
}
