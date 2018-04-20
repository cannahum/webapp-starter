import {AuthChecker} from "type-graphql";
import {AppContext} from "../App";

export const authorizer: AuthChecker<AppContext> =
  ({ root, args, context, info }, roles): boolean => {
  const {user} = context;
  return !!user;
};
