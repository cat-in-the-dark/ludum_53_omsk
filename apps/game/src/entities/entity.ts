import { IUpdateable } from "cat-lib";

export interface IEntity extends IUpdateable {
  isDeleted: boolean;
}
