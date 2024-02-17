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

  it("all tokens ", () => {
    const input = `
      let result = 0;
      const multiplier = 10;

      let arr = [];

      if (result < 10) {
        return true;
      } else {
        if (result > 10 && result < 20) {
          return false;
        }
        
        if (result > 20 || result < 10) {
          return true;
        }

        if (result == 10) {
          return true;
        }
      }

      const paper = 100;
      if (paper >= 100) {
        return true;
      }

      if (paper <= 50) {
        return false;
      }

      if(paper NOT 99) {
        return true;
      }

      func add(x, y) {
        return x + y;
      }

      const multiply = func(x, y) {
        return x * y;
      }

      const divide = func(x, y) {
        return x / y;
      }

    `;

    const tokens = [
      // part 1
      { type: TokenType.Let, literal: "let" },
      { type: TokenType.Ident, literal: "result" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Number, literal: "0" },
      { type: TokenType.Semicolon, literal: ";" },
      // part 2
      { type: TokenType.Const, literal: "const" },
      { type: TokenType.Ident, literal: "multiplier" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Number, literal: "10" },
      { type: TokenType.Semicolon, literal: ";" },
      // part 3
      { type: TokenType.Let, literal: "let" },
      { type: TokenType.Ident, literal: "arr" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.OpenBracket, literal: "[" },
      { type: TokenType.CloseBracket, literal: "]" },
      { type: TokenType.Semicolon, literal: ";" },
      // part 4
      { type: TokenType.If, literal: "if" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "result" },
      { type: TokenType.LessThan, literal: "<" },
      { type: TokenType.Number, literal: "10" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.True, literal: "true" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },
      //part 5
      { type: TokenType.Else, literal: "else" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.If, literal: "if" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "result" },
      { type: TokenType.GreaterThan, literal: ">" },
      { type: TokenType.Number, literal: "10" },
      { type: TokenType.And, literal: "&&" },
      { type: TokenType.Ident, literal: "result" },
      { type: TokenType.LessThan, literal: "<" },
      { type: TokenType.Number, literal: "20" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.False, literal: "false" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },
      //part 6
      { type: TokenType.If, literal: "if" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "result" },
      { type: TokenType.GreaterThan, literal: ">" },
      { type: TokenType.Number, literal: "20" },
      { type: TokenType.Or, literal: "||" },
      { type: TokenType.Ident, literal: "result" },
      { type: TokenType.LessThan, literal: "<" },
      { type: TokenType.Number, literal: "10" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.True, literal: "true" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },
      //part 7
      { type: TokenType.If, literal: "if" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "result" },
      { type: TokenType.Equal, literal: "==" },
      { type: TokenType.Number, literal: "10" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.True, literal: "true" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },
      { type: TokenType.CloseBrace, literal: "}" },
      //part 8
      { type: TokenType.Const, literal: "const" },
      { type: TokenType.Ident, literal: "paper" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Number, literal: "100" },
      { type: TokenType.Semicolon, literal: ";" },
      // part 8.1
      { type: TokenType.If, literal: "if" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "paper" },
      { type: TokenType.GreaterThanEqual, literal: ">=" },
      { type: TokenType.Number, literal: "100" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.True, literal: "true" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },
      // part 8.2
      { type: TokenType.If, literal: "if" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "paper" },
      { type: TokenType.LessThanEqual, literal: "<=" },
      { type: TokenType.Number, literal: "50" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.False, literal: "false" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },

      // part 8.3
      { type: TokenType.If, literal: "if" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "paper" },
      { type: TokenType.NOT, literal: "not" },
      { type: TokenType.Number, literal: "99" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.True, literal: "true" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },

      //part 9.1 - funcs
      { type: TokenType.Function, literal: "func" },
      { type: TokenType.Ident, literal: "add" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "x" },
      { type: TokenType.Comma, literal: "," },
      { type: TokenType.Ident, literal: "y" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.Ident, literal: "x" },
      { type: TokenType.Plus, literal: "+" },
      { type: TokenType.Ident, literal: "y" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },

      //part 9.2
      { type: TokenType.Const, literal: "const" },
      { type: TokenType.Ident, literal: "multiply" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Function, literal: "func" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "x" },
      { type: TokenType.Comma, literal: "," },
      { type: TokenType.Ident, literal: "y" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.Ident, literal: "x" },
      { type: TokenType.Asterisk, literal: "*" },
      { type: TokenType.Ident, literal: "y" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },

      // part 9.3
      { type: TokenType.Const, literal: "const" },
      { type: TokenType.Ident, literal: "divide" },
      { type: TokenType.Assign, literal: "=" },
      { type: TokenType.Function, literal: "func" },
      { type: TokenType.OpenParenthesis, literal: "(" },
      { type: TokenType.Ident, literal: "x" },
      { type: TokenType.Comma, literal: "," },
      { type: TokenType.Ident, literal: "y" },
      { type: TokenType.CloseParenthesis, literal: ")" },
      { type: TokenType.OpenBrace, literal: "{" },
      { type: TokenType.RETURN, literal: "return" },
      { type: TokenType.Ident, literal: "x" },
      { type: TokenType.Slash, literal: "/" },
      { type: TokenType.Ident, literal: "y" },
      { type: TokenType.Semicolon, literal: ";" },
      { type: TokenType.CloseBrace, literal: "}" },

      { type: TokenType.Eof, literal: "eof" },
    ];

    const lexer = new Tokenizer(input);

    for (const token of tokens) {
      const next = lexer.nextToken();
      expect(next).toStrictEqual(token);
    }
  });
});
