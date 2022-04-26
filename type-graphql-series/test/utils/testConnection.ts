import {DataSource, DataSourceOptions} from "typeorm";

const options:DataSourceOptions = {
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "admin",
  password: "pass",
  database: "typegraphql-test",
  synchronize: false,
  dropSchema: false,
  entities: [__dirname + "/../../src/entity/*.*"],
};
const TestDataSource = new DataSource(options);

export const testDataSource = async (drop:boolean = false) => {
  if(!TestDataSource.isInitialized) {
    await TestDataSource.initialize();
    if(drop) {
      try {
        await TestDataSource.dropDatabase(); 
      } catch(e) {
        console.log("Database 를 Drop 못함. 아마 없는듯?");
      }
    }
    await TestDataSource.synchronize()
  }
  return TestDataSource;
}


