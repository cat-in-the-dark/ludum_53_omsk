import { Container } from "@pixi/display";
import { Text, TextStyle } from "@pixi/text";
import { IScene, sceneManager } from "cat-lib";
import { inputs } from "cat-lib-web";

export class GameOverScene implements IScene {
  constructor(public container: Container) {}

  activate(): void {
    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 64,
      fontWeight: "bold",
      fill: "#FFFFFF",
    });
    const txt = new Text("GAME OVER\npress SPACE\n to restart", style);
    this.container.addChild(txt);
  }
  exit(): void {
    this.container.removeChildren();
  }
  update(_dt: number): void {
    // nothing to do
    if (inputs.isPressed("Space")) {
      sceneManager.set("title");
    }
  }
}
