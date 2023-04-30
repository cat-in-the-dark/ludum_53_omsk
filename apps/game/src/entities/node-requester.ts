import { Container } from "@pixi/display";
import { Graphics } from "@pixi/graphics";
import { Cooldown, IUpdateable } from "cat-lib";
import { ISource } from "./i-source";
import { sequence } from "../models";

export class NodeRequester implements IUpdateable {
  private graphics: Graphics;

  private spawnTimer = new Cooldown(1);

  private connection?: ISource = undefined;

  constructor(
    private x: number,
    private y: number,
    private address: string,
    public container: Container
  ) {
    this.graphics = new Graphics();
    this.graphics.clear();
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRect(this.x, this.y, 24, 24);
    this.graphics.endFill();
    this.container.addChild(this.graphics);
  }

  update(dt: number): void {
    if (this.spawnTimer.invoke()) {
      this.connection?.get({
        id: sequence.next(),
        dst: "1.1.1.1",
        src: [this.address],
      });
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
