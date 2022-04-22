import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root, Ctx,
  //ResolverInterface,
} from "type-graphql";
import {User} from "@/entity/User";
import bcrypt from "bcryptjs";
import {MyContext} from "@/types/MyContext";

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
    console.log("found user : ", user);
    console.log("curr session : ", ctx.req.session);

    (ctx.req.session as any).user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }
    // ctx.req.session.save()
    
    return user;
  }

}