import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware,} from "type-graphql";
import * as bcrypt from "bcryptjs";
import {User} from "@/app/entity/User";
import {UserRegisterInput} from "./inputs/UserRegisterInput";
import {isAuth} from "@/app/gql/middleware/isAuth";
import {MyContext} from "@/app/gql/types/MyContext";
import {logger} from "@/app/gql/middleware/logger";
import {sendEmail} from "@/app/utils/sendEmail";
import {createConfirmationUrl} from "@/app/utils/createConfirmationUrl";
import {UserConfirmation} from "@/app/entity/UserConfirmation";
import {PasswordReset} from "@/app/entity/PasswordReset";
import {ChangePasswordInput} from "@/app/gql/resolvers/inputs/ChangePasswordInput";

@Resolver(() => User)
export class UserResolver {
  // @Authorized()
  @UseMiddleware(logger, isAuth)
  @Query(() => String)
  async hello(@Ctx() context: MyContext): Promise<string> {
    const {userName} = context.req.session;
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
    const {email, firstName, lastName, password} = data;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    const confirmUrl = await createConfirmationUrl(user.id);
    await sendEmail(email, confirmUrl)

    return user;
  }

  @Mutation(() => Boolean)
  async confirm(
    @Arg("confirmId") confirmId: string
  ) {
    const confirmation = await UserConfirmation.findOne({where: {confirmId}});
    if (!confirmation) {
      return false;
    }
    await UserConfirmation.remove(confirmation);
    const {affected} = await User.update({id: confirmation.userId}, {confirmed: true});
    return affected && affected > 0;
  }

  @Mutation(() => Boolean)
  async resetPassword(@Arg("email") email: string) {
    const user = await User.findOneBy({email});
    if (!user) {
      // 해커야. 이 방법으로 유효 이메일 주소를 알아낼수 없을껄?
      return true;
    }

    const reset = await PasswordReset.create({userId: user.id}).save()
    await sendEmail(email, `http://localhost:3000/user/reset-password/${reset.token}`)
    return true;
  }

  @Mutation(() => Boolean, {nullable: true})
  async changePassword(
    @Ctx() context: MyContext,
    @Arg("data") data: ChangePasswordInput
  ) {
    const {token, password} = data;
    const reset = await PasswordReset.findOneBy({token});
    if (!reset) {
      return false;
    }
    await PasswordReset.delete({token});

    const hashedPassword = await bcrypt.hash(data.password, 12);
    // const result = await User.update({id: reset.userId}, {password: hashedPassword})
    // const changed =  result.affected && result.affected > 0;
    const user = await User.findOneBy({ id: reset.userId });
    if(!user) {
      return false;
    }
    user.password = hashedPassword;
    await user.save();
    
    context.req.session.userId = user.id;
    context.req.session.userName = user.name(user);
    context.req.session.save();
    
    return true;
  }
  
}
