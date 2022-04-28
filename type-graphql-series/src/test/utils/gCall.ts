import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "@/app/utils/createSchema";
import { Maybe } from "graphql/jsutils/Maybe";

interface gCallOptions {
  source: string;
  userId?: number;
  variableValues?: Maybe<{ [key: string]: any }>;
}

let schema: GraphQLSchema;

export const gCall = async ({
  source,
  userId,
  variableValues,
}: gCallOptions) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
};
