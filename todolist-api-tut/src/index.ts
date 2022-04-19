import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from ".pnpm/apollo-server-core@3.6.7_graphql@16.3.0/node_modules/apollo-server-core";
import { DataSource } from "typeorm";
import { Task } from "./entities/Task";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "pass",
  database: "todolist-graphql-db",
  logging: true,
  synchronize: true,
  entities: [Task],
});

const main = async () => {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [TaskResolver],
    validate: false,
  });
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();

  const app = express();

  apolloServer.applyMiddleware({ app });
  // app.get("/", (_, res) => {
  //   res.send("Hello World");
  // });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 에서 실행되었습니다`);
  });
};

main()
  .catch((err) => console.log(err))
  .then(() => {
    console.log("main실행됨");
  });
