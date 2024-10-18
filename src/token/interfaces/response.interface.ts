import { Token } from "./token.interface";

export interface Response {
  message: string;
  token: Token;
  isValidToken?: boolean;
}