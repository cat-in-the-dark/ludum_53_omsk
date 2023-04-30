import { Assets } from "@pixi/assets";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { IScene, Timer, sceneManager } from "cat-lib";
import { inputs } from "cat-lib-web";

export class TitleScene implements IScene {
  private ready = false;

  private cd = new Timer(0.2);

  constructor(public container: Container) {}

  activate(): void {
    this.cd.reset();
    Assets.load("logo").then((tex) => {
      const logo = Sprite.from(tex);
      logo.x = 0;
      logo.y = 0;
      logo.scale = { x: 16, y: 16 };
      this.container.addChild(logo);
    });
    Assets.loadBundle("main").then(() => {
      this.ready = true;
    });
  }
  exit(): void {
    this.container.removeChildren();
  }
  update(dt: number): void {
    if (this.ready) {
      this.cd.update(dt);
      if (this.cd.isPassed && inputs.isPressed("Space")) {
        sceneManager.set("game");
      }
    }
  }
}
