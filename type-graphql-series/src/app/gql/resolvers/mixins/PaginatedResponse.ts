import { ClassType, Field, Int, ObjectType } from "type-graphql";
import { IHavePaginationInfo } from "@/app/gql/resolvers/inputs";

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` 옵션을 설정하면 schema 에 이 클래스가 등록되는걸 방지한다.
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass implements IHavePaginationInfo {
    // 실제 목록
    @Field((_) => [TItemClass])
    items: TItem[];

    @Field((_) => Int)
    total: number;

    @Field((_) => Int)
    page: number;

    @Field((_) => Int)
    totalPage: number;
  }

  return PaginatedResponseClass;
}
