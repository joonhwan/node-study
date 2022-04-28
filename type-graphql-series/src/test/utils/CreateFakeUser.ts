import faker from "@faker-js/faker";

export function createFakeUser(): any {
  const [firstName, lastName] = [faker.name.firstName(), faker.name.lastName()];
  const user = {
    email: faker.internet.email(firstName, lastName), //"gildong@naver.com",
    password: faker.internet.password(8), //"password123",
    firstName, //"Gildong",
    lastName, // "Hong"
  };
  return user;
}
