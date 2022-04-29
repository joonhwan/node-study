import { Arg, Mutation, Resolver } from "type-graphql";
import { UserCreateInput } from "@/app/gql/resolvers/inputs/UserCreateInput";
import { User } from "@/app/entity/User";
import * as bcrypt from "bcryptjs";
//
// @Resolver()
// export class CreateUserResolver {
//   @Mutation(() => User)
//   async createUser(@Arg("data") data: UserCreateInput) {
//     const { email, firstName, lastName, password } = data;
//     const hashedPassword = await bcrypt.hash(password, 12);
//     return User.create({
//       email,
//       firstName,
//       lastName,
//       password: hashedPassword,
//       confirmed: true,
//     }).save();
//   }
// }

import { ClassType } from "type-graphql";
import { BaseEntity } from "typeorm";
import { AppDataSource } from "@/app/data-source";

export const createModelResolver = <
  TEntity extends ClassType,
  TCreateInput extends ClassType
>(
  name: string,
  entityType: TEntity,
  createInputType: TCreateInput,
  createInputTypeConverter?: (data: TCreateInput) => TCreateInput
) => {
  @Resolver({ isAbstract: true }) // 동일한 이름으로 여러 쿼리/변이를 등록하여 오류가 발생하지 않도록
  abstract class BaseResolver {
    @Mutation(() => entityType, { name: `create${name}` })
    async create(
      @Arg(`input${name}`, () => createInputType) data: TCreateInput
    ) {
      if (createInputTypeConverter) {
        data = createInputTypeConverter(data);
      }
      const repo = AppDataSource.getRepository(entityType);
      return await repo.create(data).save();
    }
  }
  return BaseResolver;
};

@Resolver()
export class UserModelResolver extends createModelResolver(
  "User",
  User,
  UserCreateInput
) {}
