// import {testDataSource} from "../../utils/testConnection";
import {DataSource} from "typeorm";
import {gCall} from "../../utils/gCall";

let ds: DataSource
beforeAll(async () => {
  // ds = await testDataSource();
})

afterAll(async () => {
  // await ds.destroy();
})

describe("Register", () => {
  it("creates user", async () => {
    const response = await gCall({
      source: `
mutation {
  register(data: {
    email: "msy2@naver.com",
    password: "okmyung",
    firstName: "Sinyoung",
    lastName: "Myung"
  }) {
    email,
    name
  }
}`
    });
    console.log("response = ", response);
  })
})