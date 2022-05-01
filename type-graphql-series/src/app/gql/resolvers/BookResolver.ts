import {
  BasicModelResolver,
  PaginatedResponse,
} from "@/app/gql/resolvers/mixins";
import { Book, BookRepository } from "@/app/entity/Book";
import { Arg, Info, Int, ObjectType, Query, Resolver } from "type-graphql";
import { AppDataSource } from "@/app/data-source";

@ObjectType()
class PaginatedBookResponse extends PaginatedResponse(Book) {}

@Resolver()
export class BookResolver {
  @Query((_) => Book)
  async findOrCreateBook(
    @Arg("id", (_) => Int) id: number,
    @Arg("title", (_) => String) title: string,
    @Arg("author", (_) => String) author: string
  ) {
    await AppDataSource.transaction(async (entityManager) => {
      const bookRepository = entityManager.withRepository(BookRepository);
      return await bookRepository.findOrCreate({
        id,
        title,
        author,
      });
    });
  }
}
