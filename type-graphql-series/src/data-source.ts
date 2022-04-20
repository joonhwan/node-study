import { DataSource, DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "pass",
  database: "typegraphql-example",
  synchronize: true,
  logging: true,
  entities: ["src/entity/*.*"],
};

export const AppDataSource = new DataSource(options);
