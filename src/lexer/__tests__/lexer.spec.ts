import { Tokenizer } from "../Lexer";
import { TokenType } from "../constants";

describe("Lexer", () => {
  it("nextToken()", () => {
    const input = `let paper = 100 @`;

    const tokens = [
      { type: TokenType.Let, literal: "let" },
      { type: TokenType.Ident, literal: "paper" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Number, literal: "100" },
      { type: TokenType.Illegal, literal: "@" },
      { type: TokenType.Eof, literal: "eof" },
    ];

    const lexer = new Tokenizer(input);

    for (const token of tokens) {
      const next = lexer.nextToken();
      expect(next).toStrictEqual(token);
    }
  });
});
