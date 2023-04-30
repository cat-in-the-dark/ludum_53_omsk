import { Application } from "@pixi/app";
import { BaseTexture, SCALE_MODES } from "@pixi/core";
import { Container } from "@pixi/display";
import { sceneManager } from "cat-lib";
import { GameScene } from "./scenes/game";
import { TitleScene } from "./scenes/title";
import { inputs } from "cat-lib-web";
import { loadAssets } from "./assets";
import { UI } from "./consts";
import { GameOverScene } from "./scenes/gameover";

async function main() {
  const app = new Application<HTMLCanvasElement>({
    background: "#000000",
    width: UI.screen.width,
    height: UI.screen.height,
    antialias: true,
  });
  BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST; // pixel perfect
  document.body.appendChild(app.view);

  inputs.connect();

  await loadAssets();

  const container = new Container();
  container.x = 0;
  container.y = 0;
  app.stage.addChild(container);

  sceneManager.put("title", new TitleScene(container));
  // supposing TitleScreen loads all the assets
  // so next screens can use Assets.get without awaits
  sceneManager.put("game", new GameScene(container));
  sceneManager.put("gameOver", new GameOverScene(container));

  sceneManager.set("title");

  // Listen for animate update
  app.ticker.add(() => {
    const dt = app.ticker.deltaMS / 1000; // in seconds
    inputs.update(dt);
    sceneManager.update(dt);
  });
}

window.onload = function () {
  main()
    .then(() => {
      console.log("[START]");
    })
    .catch((err) => console.error(err));
  window.focus();
};
window.onclick = function () {
  window.focus();
};
