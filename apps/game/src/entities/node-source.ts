import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Cooldown, IUpdateable } from "cat-lib";
import { ISource } from "./i-source";
import { Request } from "../models";

export class NodeSource implements IUpdateable, ISource {
  private graphics: Graphics;

  private spawnTimer = new Cooldown(1);

  private reqQueue: Request[] = [];

  constructor(
    private x: number,
    private y: number,
    private address: string,
    public container: Container
  ) {
    this.graphics = new Graphics();
    this.graphics.clear();
    this.graphics.beginFill(0xffffff);
    this.graphics.drawCircle(this.x, this.y, 32);
    this.graphics.endFill();
    this.container.addChild(this.graphics);
  }

  get(req: Request): void {
    this.reqQueue.push(req);
  }

  update(dt: number): void {
    if (this.spawnTimer.invoke()) {
      //
    }

    this.spawnTimer.update(dt);
  }
}
