import { InternalWords, TokenType } from "../lexer/constants";
import { Token, TokenItem } from "../lexer/types";

type Expression = {
  value: string;
  type: TokenItem;
  expression?: Expression;
};

type ParserExpression = {
  type: TokenItem;
  value: string;
  expression?: Expression;
};

type ParserValue = {
  type: TokenItem;
  value: string;
  expression: ParserExpression;
};

export class Parser {
  private position: number = 0;
  private actualToken: Token = { type: TokenType.Illegal, literal: "" };
  private ast: ParserValue[] = [];
  constructor(private tokens: Token[]) {}

  public parse(): ParserValue[] {
    while (this.position < this.tokens.length) {
      const token = this.peek();
      this.parseToken(token);
    }

    return this.ast;
  }

  private parseToken({ literal, type }: Token): void {
    if (this.isVariableDeclaration({ literal, type })) {
      return this.parseVariableDeclaration();
    }
    this.position++;
  }

  private isVariableDeclaration({ literal }: Token): boolean {
    const internalWords = InternalWords[literal as keyof typeof InternalWords];
    if (!internalWords) return false;
    if (
      internalWords == InternalWords.let ||
      internalWords == InternalWords.const
    ) {
      return true;
    }
    return false;
  }

  private parseVariableDeclaration(): void {
    const token = this.readToken();
    const expression = this.parseExpression();
    this.ast.push({
      type: token.type,
      value: token.literal,
      expression,
    });
  }

  private parseExpression(): Expression {
    const expression: Expression = {
      value: undefined,
      type: undefined,
      expression: undefined,
    };
    let actualExpression: Expression = {
      value: undefined,
      type: undefined,
      expression: undefined,
    };
    this.readToken();

    let stillReading = true;
    let timesRead = 0;
    while (stillReading) {
      if (timesRead === 0 && this.actualToken.type !== TokenType.Ident) {
        throw new Error(
          `Invalid syntax, expecting identifier, found ${this.actualToken.type}`
        );
      }

      if (timesRead === 1 && this.actualToken.type !== TokenType.Assign) {
        throw new Error(
          `Invalid syntax, expecting assertion, found ${this.actualToken.type}`
        );
      }

      if (this.actualToken.type == TokenType.Semicolon) {
        stillReading = false;
        continue;
      }

      if (!expression.value) {
        expression.value = this.actualToken.literal;
        expression.type = this.actualToken.type;
      } else {
        actualExpression.value = this.actualToken.literal;
        actualExpression.type = this.actualToken.type;
      }
      expression.expression = actualExpression;
      timesRead++;
      this.readToken();
    }
    return expression;
  }

  private peek(): Token {
    return this.tokens[this.position];
  }

  private readToken(): Token {
    this.actualToken = this.tokens[this.position++];
    // this.position++;
    return this.actualToken;
  }

  public getAST(): ParserValue[] {
    return this.ast;
  }
}
