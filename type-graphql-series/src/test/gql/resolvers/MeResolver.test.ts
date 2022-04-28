import { DataSource } from "typeorm";
import { testDataSource } from "@/test/utils/testConnection";
import { createFakeUser } from "@/test/utils/CreateFakeUser";
import { User } from "@/app/entity/User";
import { gCall } from "@/test/utils/gCall";

let conn: DataSource;

beforeAll(async () => {
  conn = await testDataSource();
});

afterAll(async () => {
  await conn.destroy();
});

const source = `
{
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Me", () => {
  it("get user", async () => {
    const user = await User.create(createFakeUser()).save();
    const response = await gCall({
      source,
      userId: user.id,
    });
    // console.log(response);
    expect(response).toMatchObject({
      data: {
        me: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  });

  it("return null", async () => {
    const response = await gCall({
      source,
    });
    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
