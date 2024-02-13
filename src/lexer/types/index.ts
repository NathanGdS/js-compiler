import { TokenType } from "../constants";

export type TokenItem = (typeof TokenType)[keyof typeof TokenType];

export type Token = {
  type: TokenItem;
  literal: string;
};
