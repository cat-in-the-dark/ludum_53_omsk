import { Container } from "@pixi/display";
import { IScene, IUpdateable } from "cat-lib";
import { NodeSource } from "../entities/node-source";
import { NodeRequester } from "../entities/node-requester";
import { NodeHub } from "../entities/node-hub";

export class GameScene implements IScene {
  private entities: IUpdateable[] = [];

  constructor(public container: Container) {}

  activate(): void {
    console.log("GAMEEE");
    const msgSource = new NodeSource(64, 64, "1.1.1.1", this.container);
    const hub = new NodeHub(160, 120, "1.1.1.2", this.container);
    const user1 = new NodeRequester(300, 200, "192.168.0.200", this.container);

    this.entities.push(msgSource);
    this.entities.push(hub);
    this.entities.push(user1);

    user1.connect(hub);
    hub.connect(msgSource);
  }
  exit(): void {
    //
  }
  update(dt: number): void {
    this.entities.forEach((entity) => entity.update(dt));
  }
}
