import {graphql, GraphQLSchema} from "graphql";
import {createSchema} from "@/app/utils/createSchema";
import {Maybe} from "graphql/jsutils/Maybe";

interface gCallOptions {
  source: string,
  variableValues?:Maybe<{ [key: string]: any }>;
}

let schema: GraphQLSchema;

export const gCall = async (options:gCallOptions) => {
  const { source, variableValues } = options;
  if(!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues
  });
}