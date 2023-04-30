import { Graphics } from "@pixi/graphics";
import { IEntity } from "./entity";
import { triangle } from "../shapes/triangle";
import { BALANCE } from "../consts";
import { Rect, clamp } from "cat-lib";
import { Player } from "./player";
import { Container } from "@pixi/display";

export class Powerup implements IEntity {
  graphics: Graphics;
  width = 32;
  height = 48;
  speed = BALANCE.powerups.speed;
  deleted = false;

  constructor(
    x: number,
    y: number,
    color: number,
    container: Container,
    private onCollision: (player: Player) => void
  ) {
    this.graphics = triangle(x, y, this.width, this.height, color);
    container.addChild(this.graphics);
  }

  get isDeleted() {
    return this.deleted;
  }

  collision(player: Player) {
    if (!this.deleted) {
      this.onCollision(player);
      this.remove();
    }
  }

  remove() {
    this.graphics.removeFromParent();
    this.deleted = true;
  }

  update(dt: number): void {
    this.y += this.speed * dt;
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
    return new Rect(this.x, this.y, this.width, this.height);
  }
}

export function atkSpeedPowerup(x: number, y: number, container: Container) {
  return new Powerup(x, y, 0xf54e42, container, (player) => {
    player.cooldowns.simpleBullet.time = clamp(
      player.cooldowns.simpleBullet.time - BALANCE.powerups.atkSpeed,
      0.05,
      1
    );
  });
}

export function extraBulletsPowerup(
  x: number,
  y: number,
  container: Container
) {
  return new Powerup(x, y, 0xf542a4, container, (player) => {
    player.extraBullets += 1;
  });
}
