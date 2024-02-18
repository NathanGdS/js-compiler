import { createToken } from "../../helpers/create-token.helper";
import { TokenType } from "./allowed-tokens.constants";

export const InternalWords = {
  let: createToken(TokenType.Let, "let"),
  const: createToken(TokenType.Const, "const"),
  func: createToken(TokenType.Function, "func"),
  NOT: createToken(TokenType.NOT, "not"),
  if: createToken(TokenType.If, "if"),
  else: createToken(TokenType.Else, "else"),
  true: createToken(TokenType.True, "true"),
  false: createToken(TokenType.False, "false"),
  int: createToken(TokenType.INT, "int"),
  number: createToken(TokenType.NUMBER, "number"),
  boolean: createToken(TokenType.BOOLEAN, "boolean"),
  string: createToken(TokenType.STRING, "string"),
  return: createToken(TokenType.RETURN, "return"),
  Array: createToken(TokenType.Array, "Array"),
} as const;
