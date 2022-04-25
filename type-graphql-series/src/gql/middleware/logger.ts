import {MiddlewareFn} from "type-graphql";

export const logger: MiddlewareFn =
  async (action, next) => {
    const { args, info, context } = action;

    const { path, fieldName, operation} = info;
    console.log(`args: ${JSON.stringify(args)}, info = ${JSON.stringify({path, operation, fieldName }, null, 2)}`);

    return next();

  }