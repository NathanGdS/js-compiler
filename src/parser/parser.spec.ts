import { TokenType } from "../lexer/constants";
import { Parser } from "./Parser";

describe("Parser", () => {
  it("variable assertion", () => {
    const tokens = [
      { type: TokenType.Let, literal: "let" },
      { type: TokenType.Ident, literal: "paper" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Number, literal: "100" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.Const, literal: "const" },
      { type: TokenType.Ident, literal: "scissor" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Number, literal: "20" },
      { type: TokenType.Semicolon, literal: ";" },
    ];

    const parser = new Parser(tokens).parse();
    expect(parser).toEqual([
      {
        type: "LET",
        value: "let",
        expression: {
          value: "paper",
          type: "IDENT",
          expression: {
            value: "=",
            type: "=",
            expression: {
              value: "100",
              type: "NUMBER",
            },
          },
        },
      },
      {
        type: "CONST",
        value: "const",
        expression: {
          value: "scissor",
          type: "IDENT",
          expression: {
            value: "=",
            type: "=",
            expression: {
              value: "20",
              type: "NUMBER",
            },
          },
        },
      },
    ]);
  });
});
