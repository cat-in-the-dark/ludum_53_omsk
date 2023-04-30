import { Circle, Cooldown, Vec2 } from "cat-lib";
import { IEntity } from "./entity";
import { Graphics } from "@pixi/graphics";
import { Container } from "@pixi/display";
import { BALANCE, UI } from "../consts";
import type { Bullet } from "./bullet";
import { enemySize } from "../state";
import { Player } from "./player";

export class Enemy implements IEntity {
  private deleted = false;
  private graphics: Graphics;

  public playerCollisions: Player[] = [];
  public collisions: Bullet[] = [];
  private hp: number;

  private dmg = BALANCE.enemyDamage;

  private mustRedraw = true;

  private dmgCooldown = new Cooldown(0.05);

  constructor(
    x: number,
    y: number,
    private speed: number,
    private dir: Vec2,
    private readonly maxHp: number,
    container: Container
  ) {
    this.hp = this.maxHp;
    this.graphics = new Graphics();
    this.graphics.x = x;
    this.graphics.y = y;
    this.draw();
    container.addChild(this.graphics);
  }

  private draw() {
    if (this.mustRedraw) {
      this.graphics.clear();

      this.graphics.beginFill(0xffffff);
      this.graphics.drawCircle(0, 0, enemySize(this.hp));
      this.graphics.endFill();
    }
  }

  update(dt: number): void {
    this.draw();
    this.dmgCooldown.update(dt);

    const dir = this.dir.normalized;
    this.x += this.speed * dir.x * dt;
    this.y += this.speed * dir.y * dt;

    if (this.y > UI.screen.height + 64) {
      this.remove();
    }

    this.collisions.forEach((b) => {
      this.hp -= b.damage;
      this.mustRedraw = true;
    });

    if (this.dmgCooldown.invoke()) {
      this.playerCollisions.forEach((p) => {
        p.getDmg(this.dmg);
      });
    }

    if (this.hp <= 0) {
      this.remove();
    }

    this.collisions = [];
    this.playerCollisions = [];
  }

  remove() {
    this.graphics.removeFromParent();
    this.deleted = true;
  }

  get isDeleted() {
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
    return new Circle(this.x, this.y, this.size);
  }

  get size() {
    return enemySize(this.hp);
  }
}
