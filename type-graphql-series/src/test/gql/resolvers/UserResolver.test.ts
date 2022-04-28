import { testDataSource } from "@/test/utils/testConnection";
import { DataSource } from "typeorm";
import { gCall } from "@/test/utils/gCall";
import { User } from "@/app/entity/User";
import { createFakeUser } from "@/test/utils/CreateFakeUser";

let ds: DataSource;
beforeAll(async () => {
  ds = await testDataSource();
});

afterAll(async () => {
  await ds.destroy();
});

const registerMutation = `
mutation Register($data: UserRegisterInput!) {
  register(data: $data) {
    id,
    email,
    firstName,
    lastName,
  }
}`;

describe("Register", () => {
  it("creates user", async () => {
    jest.setTimeout(10000);

    const user = createFakeUser();
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
    console.log("response = ", response);

    const dbUser = await User.findOneBy({ email: user.email });
    expect(dbUser).toBeDefined();
    expect(dbUser?.confirmed).toBeFalsy();
    expect(dbUser).toMatchObject({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  });
});
