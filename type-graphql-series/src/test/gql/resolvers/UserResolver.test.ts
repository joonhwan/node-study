import {testDataSource} from "@/test/utils/testConnection";
import {DataSource} from "typeorm";
import {gCall} from "@/test/utils/gCall";

let ds: DataSource
beforeAll(async () => {
  ds = await testDataSource();
})

afterAll(async () => {
  await ds.destroy();
})

describe("Register", () => {
  it("creates user", async () => {
    jest.setTimeout(10000);
    
    const response = await gCall({
      source: `
mutation {
  register(data: {
    email: "gildong@naver.com",
    password: "password123",
    firstName: "Gildong",
    lastName: "Hong"
  }) {
    email,
    name
  }
}`
      
    });
    console.log("response = ", response);
  })
})