import { Cooldown, IUpdateable } from "cat-lib";
import { ISource } from "./i-source";
import { Request } from "../models";
import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";

export class NodeHub implements IUpdateable, ISource {
  private graphics: Graphics;

  private spawnTimer = new Cooldown(1);

  private connection?: ISource = undefined;

  private reqQueue: Request[] = [];

  constructor(
    private x: number,
    private y: number,
    private address: string,
    public container: Container
  ) {
    this.graphics = new Graphics();
    this.graphics.clear();
    this.graphics.beginFill(0xaaffaa);
    this.graphics.drawCircle(this.x, this.y, 24);
    this.graphics.endFill();
    this.container.addChild(this.graphics);
  }
  get(req: Request): void {
    this.reqQueue.push(req);
  }
  update(dt: number): void {
    if (this.spawnTimer.invoke()) {
      const conn = this.connection;
      if (conn) {
        const req = this.reqQueue.shift();
        if (req) {
          conn.get({ ...req, src: [...req.src, this.address] });
        }
      }
    }

    this.spawnTimer.update(dt);
  }

  connect(source: ISource) {
    this.connection = source;
  }

  disconnect() {
    this.connection = undefined;
  }
}
