import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Vec2 } from "cat-lib";
import { triangle } from "../shapes/triangle";
import { outOfScreen } from "../helpers";
import { IEntity } from "./entity";
import type { Enemy } from "./enemy";

export class Bullet implements IEntity {
  private deleted = false;
  private graphics: Graphics;
  private width = 4;
  private height = 16;

  public collisions: Enemy[] = [];

  constructor(
    x: number,
    y: number,
    private speed: number,
    private dir: Vec2,
    public damage: number,
    container: Container
  ) {
    this.graphics = triangle(x, y, this.width, this.height, 0xffffff);
    container.addChild(this.graphics);
  }

  update(dt: number): void {
    const dir = this.dir.normalized;
    this.x += this.speed * dir.x * dt;
    this.y += this.speed * dir.y * dt;

    if (outOfScreen(this.x, this.y)) {
      this.remove();
    }

    if (this.collisions.length > 0) {
      this.remove();
    }

    this.collisions = [];
  }

  remove() {
    this.graphics.removeFromParent();
    this.deleted = true;
  }

  public get isDeleted() {
    return this.deleted;
  }

  public set x(v: number) {
    this.graphics.x = v;
  }
  public get x() {
    return this.graphics.x;
  }

  public set y(v: number) {
    this.graphics.y = v;
  }
  public get y() {
    return this.graphics.y;
  }

  get body() {
    return new Vec2(this.x, this.y);
  }
}
