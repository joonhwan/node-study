import { Length, Min } from "class-validator";
import { Field, Float, InputType, Int } from "type-graphql";

@InputType()
export class ProductCreateInputType {
  @Field(() => String)
  @Length(1, 100)
  name: string;

  @Field(() => Int)
  @Min(0)
  amount: number;

  @Field(() => Float)
  @Min(0)
  price: number;
}
