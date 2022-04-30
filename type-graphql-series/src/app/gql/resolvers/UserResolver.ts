import { Arg, ObjectType, Query, Resolver } from "type-graphql";
import { UserCreateInputType } from "@/app/gql/resolvers/inputs/UserCreateInputType";
import { User } from "@/app/entity/User";
import * as bcrypt from "bcryptjs";
import { BasicModelResolver, PaginatedResponse } from "./mixins";
import { PaginationInputType } from "@/app/gql/resolvers/inputs";
import { AppDataSource } from "@/app/data-source";
import { Repository } from "typeorm";

@ObjectType()
class PaginatedUserResponse extends PaginatedResponse(User) {
  //
}

@Resolver() //
export class UserResolver extends BasicModelResolver(
  "User",
  User,
  UserCreateInputType
) {
  private userRepository: Repository<User>;
  constructor() {
    super();
    this.userRepository = AppDataSource.getRepository(User);
  }

  @Query((_) => PaginatedUserResponse)
  async users(
    @Arg("pagination", { nullable: true }) pagination?: PaginationInputType
  ) {
    let paging = pagination?.getSkipTake() ?? {};

    const items = await this.userRepository.find(paging);
    const response = await this.createPagedQueryResponse(
      PaginatedUserResponse,
      pagination
    );
    response.items = items;
    return response;
  }

  protected async onHandleCreateInputAsync(data: any) {
    data.password = await bcrypt.hash(data.password, 12);
    return data;
  }
}
