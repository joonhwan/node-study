import {DataSource, DataSourceOptions} from "typeorm";

const entityPath = __dirname + "/../../app/entity/*.ts";
// console.log(`Entity Path : ${entityPath}`)

const options: DataSourceOptions = {
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "admin",
  password: "pass",
  database: "typegraphql-test",
  logging: false,
  synchronize: false,
  dropSchema: false,
  entities: [entityPath],
};
const TestDataSource = new DataSource(options);

export const testDataSource = async (drop: boolean = false) => {
  if (!TestDataSource.isInitialized) {
    await TestDataSource.initialize();
    if (drop) {
      try {
        // console.log("Dropping Database...");
        await TestDataSource.dropDatabase();
      } catch (e) {
        console.log("Database 를 Drop 못함. 아마 없는듯?");
      }
    }
    // console.log("synchronizing...")
    await TestDataSource.synchronize() 
  } else {
    // console.log("initialized !?")
  }
  return TestDataSource;
}


