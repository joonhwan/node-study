import {
  Arg,
  ArgsType,
  ClassType,
  Field,
  Int,
  Mutation,
  Resolver,
} from "type-graphql";
import { AppDataSource } from "@/app/data-source";
import { DeepPartial, Repository } from "typeorm";
import {
  IHavePaginationInfo,
  PaginationInputType,
} from "@/app/gql/resolvers/inputs";

@ArgsType()
class PaginationArgs {
  @Field(() => Int)
  skip: number = 0;

  @Field(() => Int)
  take: number = 20;
}

export function BasicModelResolver<
  TEntity extends ClassType,
  TCreateInput extends DeepPartial<TEntity>
>(name: string, entityType: TEntity, createInputType: TCreateInput) {
  //
  // 동일한 이름으로 여러 쿼리/변이를 등록하여 오류가 발생하지 않도록
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    private readonly repository: Repository<any>;
    protected constructor() {
      this.repository = AppDataSource.getRepository(entityType);
    }
    //
    @Mutation(() => entityType, { name: `create${name}` })
    async create(
      @Arg(`input${name}`, () => createInputType) data: TCreateInput
    ) {
      data = await this.onHandleCreateInputAsync(data);
      return await this.repository.create(data).save();
    }
    //
    @Mutation(() => Int, { name: `remove${name}` })
    async remove(@Arg(`id`, () => Int) id: number) {
      const result = await this.repository.delete(id);
      return result.affected;
    }
    // //
    // @Query(() => [entityType], { name: `${name}` })
    // async all(@Arg() { perPage });

    protected onHandleCreateInputAsync(
      data: TCreateInput
    ): Promise<TCreateInput> {
      return new Promise((res) => {
        return res(data);
      });
    }

    protected async createPagedQueryResponse<T extends IHavePaginationInfo>(
      TResponseType: new () => T,
      pagination?: PaginationInputType
    ): Promise<T> {
      const response = new TResponseType();
      const total = await this.repository.count();
      response.page = pagination?.page ?? 0;
      response.total = total;
      response.totalPage = pagination
        ? Math.ceil(total / pagination.perPageCount)
        : 1;
      return response;
    }
  }

  return BaseResolver;
}
