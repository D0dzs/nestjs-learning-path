import { Cat } from "./cats.interface";

export interface CommonResponse {
  message: string;
  body: Cat | Cat[];
}
