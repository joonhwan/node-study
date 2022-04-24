import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  //ResolverInterface,
} from "type-graphql";
import {User} from "@/entity/User";
import bcrypt from "bcryptjs";
import {MyContext} from "@/gql/types/MyContext";

declare module "express-session" {
  interface SessionData {
    userId: number,
    userName: string,
  }
}

@Resolver()
export class LogInResolver {
  @Mutation(() => User, {nullable: true})
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ) {
    
    const user = await User.findOneBy({ email});
    if(!user) {
      return null;
    }
    
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
      return null;
    }
    // console.log("found user : ", user);
    // console.log("curr session : ", ctx.req.session);

    ctx.req.session.userId = user.id;
    ctx.req.session.userName = user.name(user);
    ctx.req.session.save();
    
    return user;
  }
  @Mutation(() => User, {nullable: true})
  async logout(@Ctx() ctx:MyContext) {
    const userId = ctx.req.session.userId;
    if(userId) {
      ctx.req.session.destroy(err => {
        console.log(`logout error : ${err}`);
      });
    }
  }
  
}