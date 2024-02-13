import { createToken } from "../../helpers/create-token.helper";
import { TokenType } from "./allowed-tokens.constants";

export const InternalWords = {
  let: createToken(TokenType.Let, "let"),
} as const;
