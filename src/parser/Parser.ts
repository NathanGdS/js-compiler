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
    const expression = this.parseVariableExpression();
    this.ast.push({
      type: token.type,
      value: token.literal,
      expression,
    });
  }

  private parseVariableExpression(
    expression: Expression = {
      value: undefined,
      type: undefined,
      expression: undefined,
    },
    timesRead: number = 0
  ): Expression {
    this.readToken();
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
      return expression;
    }

    const old = expression;
    if (timesRead === 0) {
      expression = {
        value: this.actualToken.literal,
        type: this.actualToken.type,
      };
    } else {
      expression = this.buildExpression(expression, old);
    }

    return this.parseVariableExpression(expression, timesRead + 1);
  }

  private buildExpression(
    expression: Expression,
    old: Expression
  ): ParserExpression {
    const newExpression = {
      value: this.actualToken.literal,
      type: this.actualToken.type,
    };

    if (old?.expression) {
      expression = {
        value: old?.value,
        type: old?.type,
        expression: {
          value: old?.expression?.value,
          type: old?.expression?.type,
          expression: newExpression,
        },
      };
    } else {
      expression = {
        value: old?.value,
        type: old?.type,
        expression: newExpression,
      };
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
