import {graphql} from "graphql";
import {createSchema} from "../../src/utils/createSchema";
import {Maybe} from "graphql/jsutils/Maybe";

interface gCallOptions {
  source: string,
  variableValues?:Maybe<{ [key: string]: any }>;
}

export const gCall = async (options:gCallOptions) => {
  const { source, variableValues } = options;
  return graphql({
    schema: await createSchema(),
    source,
    variableValues
  });
}