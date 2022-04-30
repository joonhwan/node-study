import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  amount: number;

  @Field(() => Float)
  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;
}
