import { Assets } from "@pixi/assets";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Text, TextStyle } from "@pixi/text";
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
      logo.scale = { x: 10, y: 10 };
      this.container.addChild(logo);
    });
    Assets.loadBundle("main").then(() => {
      this.ready = true;

      const style = new TextStyle({
        fontFamily: "Arial",
        fontSize: 64,
        fontWeight: "bold",
        fill: "#FFFFFF",
      });
      const txt = new Text("press SPACE\n to start", style);
      txt.x = 100;
      txt.y = 500;
      this.container.addChild(txt);
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
