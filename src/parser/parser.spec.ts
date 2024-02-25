import { TokenType } from "../lexer/constants";
import { Parser } from "./Parser";

describe("Parser", () => {
  it("should be defined", () => {
    const tokens = [
      { type: TokenType.Let, literal: "let" },
      { type: TokenType.Ident, literal: "paper" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Number, literal: "100" },
      { type: TokenType.Semicolon, literal: ";" },
    ];

    const parser = new Parser(tokens).parse();
    console.log(JSON.stringify(parser, null, 2));
    expect(parser).toEqual([
      {
        type: "LET",
        value: "let",
        expression: {
          value: "paper",
          type: "IDENT",
          expression: {
            value: "100",
            type: "NUMBER",
          },
        },
      },
    ]);
  });
});
