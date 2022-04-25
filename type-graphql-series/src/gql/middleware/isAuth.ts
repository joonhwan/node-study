import {MiddlewareFn} from "type-graphql";
import {MyContext} from "@/gql/types/MyContext";

export const isAuth: MiddlewareFn<MyContext> =
  async (action, next) => {
    const {context, root, info, args} = action

    if (!context.req.session.userId) {
      throw new Error("응? 로그인을 안하셨네요!!!!");
    }
    return next();
  };

