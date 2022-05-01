import {
  BasicModelResolver,
  PaginatedResponse,
} from "@/app/gql/resolvers/mixins";
import { Product } from "@/app/entity/Product";
import { ProductCreateInputType } from "@/app/gql/resolvers/inputs/ProductCreateInputType";
import { Arg, Info, ObjectType, Query, Resolver } from "type-graphql";
import { PaginationInputType } from "@/app/gql/resolvers/inputs";
import { AppDataSource } from "@/app/data-source";
import { Repository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";

@ObjectType()
class PaginatedProductResponse extends PaginatedResponse(Product) {}

@Resolver()
export class ProductResolver extends BasicModelResolver(
  "Product",
  Product,
  ProductCreateInputType
) {
  private ProductRespotiory: Repository<Product>;
  constructor() {
    super();
    this.ProductRespotiory = AppDataSource.getRepository(Product);
  }

  @Query((_) => PaginatedProductResponse, { complexity: 10 })
  async product(
    @Info() info: GraphQLResolveInfo,
    @Arg("pagination", { nullable: true }) pagination?: PaginationInputType
  ) {
    const paging = pagination?.getSkipTake() ?? {};
    console.log("pagin = ", JSON.stringify(paging, null, 2));
    const items = await this.ProductRespotiory.find(paging);
    const response = await this.createPagedQueryResponse(
      PaginatedProductResponse,
      info,
      pagination
    );
    response.items = items;
    return response;
  }
}
