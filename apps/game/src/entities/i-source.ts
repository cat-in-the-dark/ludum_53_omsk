import { Request } from "../models";

export interface ISource {
  // todo: return like await
  get(req: Request): void;
}
