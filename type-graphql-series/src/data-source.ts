import { DataSource, DataSourceOptions } from "typeorm";

export const AppDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "admin",
  password: "pass",
  database: "typegraphql-example",
  synchronize: true,
  logging: true,
  entities: ["src/entity/*.*"],
};

export const AppDataSource = new DataSource(AppDataSourceOptions);
