import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  EntityRepository,
  PrimaryGeneratedColumn,
  Repository,
} from "typeorm";
import { AppDataSource } from "@/app/data-source";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  author: string;
}

export const BookRepository = AppDataSource.getRepository(Book).extend({
  async findOrCreate({ id, ...data }: Partial<Book>) {
    let book = await this.findOneBy({ id });
    if (!book) {
      book = await this.save({
        id,
        ...data,
      });
    }
    return book;
  },
});
