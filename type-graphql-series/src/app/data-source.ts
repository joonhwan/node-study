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
  // npm run 스크립트 실행 시 작업디렉토리 기준의 상대 경로 또는 절대경로
  entities: ["src/app/entity/*.ts"],
  //entities: [__dirname + "/entity/*.ts"],
};

export const AppDataSource = new DataSource(AppDataSourceOptions);
