import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Express from "express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
  const ds = await AppDataSource.initialize();
  ds.synchronize();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();

  const app = Express();
  apolloServer.applyMiddleware({
    app,
  });
  app.listen(4000, () => {
    console.log("server started on http://localhost:4000");
  });
};

main();
