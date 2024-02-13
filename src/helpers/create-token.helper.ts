import { Token, TokenItem } from "src/lexer/types";

export function createToken(type: TokenItem, literal: string): Token {
  return { type, literal };
}
