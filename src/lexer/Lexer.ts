import { isLetter, isNumber } from "../helpers/char.helpers";
import { createToken } from "../helpers/create-token.helper";
import { InternalWords, TokenType } from "./constants";
import { Token } from "./types";

export class Tokenizer {
  private readPosition: number = 0;
  private position: number = 0;
  private ch!: string;

  constructor(private input: string) {
    this.readChar();
  }

  public nextToken(): Token {
    this.skipWhitespace();

    let token: Token | undefined = this.readOperators();

    if (isLetter(this.ch)) {
      const ident = this.readIdent();

      const internalWords = InternalWords[ident as keyof typeof InternalWords];

      if (internalWords) {
        return internalWords;
      } else {
        return createToken(TokenType.Ident, ident);
      }
    } else if (isNumber(this.ch)) {
      return createToken(TokenType.Number, this.readInt());
    } else if (!token) {
      const illegalChar = this.ch;
      this.readChar();
      return createToken(TokenType.Illegal, illegalChar);
    }

    this.readChar();
    return token as Token;
  }

  private readOperators(): Token | undefined {
    switch (this.ch) {
      case "\0":
        return createToken(TokenType.Eof, "eof");

      case "=":
        return createToken(TokenType.Assign, this.ch);

      default:
        return;
    }
  }

  private skipWhitespace(): void {
    while (
      this.ch === " " ||
      this.ch === "\t" ||
      this.ch === "\n" ||
      this.ch === "\r"
    ) {
      this.readChar();
    }
  }

  private readChar(): void {
    if (this.ch === "\0") {
      return;
    }
    if (this.readPosition >= this.input.length) {
      this.ch = "\0";
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  private readIdent(): string {
    const position = this.position;

    while (isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private readInt(): string {
    const position = this.position;

    while (isNumber(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }
}
