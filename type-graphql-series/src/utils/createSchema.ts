import {buildSchema} from "type-graphql";

export const createSchema = async () => {
  return buildSchema({
    resolvers: [ __dirname + "/../gql/resolvers/**/*.ts" ], //[UserResolver, LogInResolver, MeResolver],
    authChecker: (resolverData, _roles) => {
      const {context, info, root, args} = resolverData;
      // here we can read the user from context
      // and check his permission in the db against the `roles` argument
      // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
      const session = context.req.session;
      if (session.userId) {
        return true;
      }

      return false; // access is denied
    }
  })
}