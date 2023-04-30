import { Vec2 } from "./vec2";

export class Circle {
  constructor(public x: number, public y: number, public r: number) {}

  get center() {
    return new Vec2(this.x, this.y);
  }
}
