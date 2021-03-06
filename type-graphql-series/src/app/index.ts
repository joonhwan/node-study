import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  GraphQLRequestContext,
} from "apollo-server-core";
import Express from "express";
import session from "express-session";
import { CreateSessionStore } from "./SessionStore";
import cors from "cors";

import { buildSchema } from "type-graphql";
import { AppDataSource } from "@/app/data-source";
import { createSchema } from "@/app/utils/createSchema";
import { graphqlUploadExpress } from "graphql-upload";
import { MyContext } from "@/app/gql/types/MyContext";
import { createComplexityPlugin } from "graphql-query-complexity-apollo-plugin";
import {
  fieldExtensionsEstimator,
  simpleEstimator,
} from "graphql-query-complexity";
// import {UserResolver} from "@/gql/resolvers/UserResolver";
// import {LogInResolver} from "@/gql/resolvers/LogInResolver";
// import {MeResolver} from "@/gql/resolvers/MeResolver";
// import {sendEmail} from "@/utils/sendEmail";

const main = async () => {
  // console.log("AppDataSource=", AppDataSource)
  await AppDataSource.initialize();

  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      createComplexityPlugin({
        schema,
        estimators: [
          fieldExtensionsEstimator(),
          simpleEstimator({ defaultComplexity: 1 }),
        ],
        maximumComplexity: 1000,
        onComplete: (complexity) => {
          console.log("Query Complexity:", complexity);
        },
      }),
    ],
    context: (context) => {
      const { req, res } = context;
      return { req, res };
    },
  });
  await apolloServer.start();

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(
    session({
      secret: "asdfasdfasdfasdf",
      cookie: {
        httpOnly: true,
        secure: false, // https 를 사용할 때만 true ?!
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax", // secure= true 인 경우에는 "None"
      },
      resave: false,
      saveUninitialized: false,
      name: "qid",
      store: CreateSessionStore(session),
    })
  );
  app.use(graphqlUploadExpress({ maxFiles: 10, maxFileSize: 100000000 }));
  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main().then((_) => {
  console.log("**********************");
});
