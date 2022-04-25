import {Ctx, Query, Resolver,} from "type-graphql";
import {User} from "@/entity/User";
import {MyContext} from "@/gql/types/MyContext";


declare module "express-session" {
  interface SessionData {
    userId: number,
  }
}


@Resolver()
export class MeResolver {
  @Query(() => User, {nullable: true})
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    const userId = ctx.req.session.userId;
    if (!userId) {
      return null;
    }
    return await User.findOneBy({id: userId});
  }
}