import { Container } from "@pixi/display";
import { Cooldown, Vec2 } from "cat-lib";
import { Graphics } from "@pixi/graphics";
import { triangle } from "../shapes/triangle";
import { inputs } from "cat-lib-web";
import { BALANCE, IControls } from "../consts";
import { IEntity } from "./entity";
import { Bullet } from "./bullet";
import { IOC } from "../state";

export class Player implements IEntity {
  private graphics: Graphics;
  private width = 32;
  private height = 48;
  private speed = BALANCE.playerSpeed;
  private bulletDamage = 1;

  private simpleBulletSpeed = BALANCE.bulletSpeed;

  private cooldowns = {
    simpleBullet: new Cooldown(0.5),
  };

  constructor(
    x: number,
    y: number,
    private container: Container,
    private controls: IControls
  ) {
    this.graphics = triangle(x, y, this.width, this.height, 0xffffff);
    this.container.addChild(this.graphics);
  }

  update(dt: number): void {
    this.move(dt);
    this.attack(dt);
  }

  private attack(dt: number) {
    if (this.cooldowns.simpleBullet.invoke()) {
      IOC.entities.bullets.push(
        new Bullet(
          this.x,
          this.y,
          this.simpleBulletSpeed,
          new Vec2(0, -1),
          this.bulletDamage,
          this.container
        )
      );
    }

    Object.values(this.cooldowns).forEach((v) => v.update(dt));
  }

  private move(dt: number) {
    const dir = new Vec2(0, 0);
    if (inputs.isPressed("Space", "keyboard")) {
      console.log(this.x, this.y);
    }
    if (inputs.isPressed(this.controls.left, this.controls.id)) {
      dir.x -= 1;
    }
    if (inputs.isPressed(this.controls.right, this.controls.id)) {
      dir.x += 1;
    }
    if (inputs.isPressed(this.controls.up, this.controls.id)) {
      dir.y -= 1;
    }
    if (inputs.isPressed(this.controls.down, this.controls.id)) {
      dir.y += 1;
    }
    dir.normalize();

    this.x += this.speed * dir.x * dt;
    this.y += this.speed * dir.y * dt;

    if (this.x <= BALANCE.playerArea.minX) {
      this.x = BALANCE.playerArea.minX;
    }
    if (this.x >= BALANCE.playerArea.maxX) {
      this.x = BALANCE.playerArea.maxX;
    }
    if (this.y <= BALANCE.playerArea.minY) {
      this.y = BALANCE.playerArea.minY;
    }
    if (this.y >= BALANCE.playerArea.maxY) {
      this.y = BALANCE.playerArea.maxY;
    }
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

  public get isDeleted() {
    return false;
  }
}
