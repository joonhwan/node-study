import { Field, InputType, Int } from "type-graphql";

export interface IHavePaginationInfo {
  page: number;
  total: number;
  totalPage: number;
}

@InputType()
export class PaginationInputType {
  @Field((_) => Int)
  page: number;

  @Field((_) => Int)
  perPageCount: number;

  normalize() {
    this.page = Math.max(this.page, 0);
    this.perPageCount = Math.max(this.page, 1);
  }

  getSkipTake() {
    const page = Math.max(this.page, 0);
    const perPageCount = Math.max(this.perPageCount, 1);

    return {
      skip: page * perPageCount,
      take: perPageCount,
    };
  }
}
