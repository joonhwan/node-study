import "reflect-metadata";
import {ApolloServer} from "apollo-server-express";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import Express from "express";
import {buildSchema} from "type-graphql";
import {AppDataSource} from "./data-source";
import {UserResolver} from "./resolvers/UserResolver";
import session from "express-session";
import {CreateSessionStore} from "./SessionStore";
import cors from "cors";
import {LogInResolver} from "@/resolvers/LogInResolver";

const main = async () => {
  const ds = await AppDataSource.initialize();
  await ds.synchronize();

  const schema = await buildSchema({
    resolvers: [UserResolver, LogInResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: context => {
      const { req } = context;
      return context;
    }
  });
  await apolloServer.start();

  const app = Express();

  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));
  app.use(
    session({
      secret: "asdfasdfasdfasdf",
      cookie: {
        httpOnly: true,
        secure: process.env.MODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      },
      resave: false,
      saveUninitialized: false,
      name: "qid",
      store: CreateSessionStore(session),
    })
  );
  apolloServer.applyMiddleware({
    app,
  });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000");
  });
};

main().then(_ => console.log("**********"));
