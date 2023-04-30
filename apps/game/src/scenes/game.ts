import { Container } from "@pixi/display";
import { IScene, circleContainsPoint } from "cat-lib";
import { Player } from "../entities/player";
import { Controls, UI } from "../consts";
import { EnemySpawner } from "../enemy-spawner";
import { IIOC, IOC } from "../state";
import { Bullet } from "../entities/bullet";
import { Enemy } from "../entities/enemy";

export class GameScene implements IScene {
  private enemySpawner: EnemySpawner;

  constructor(public container: Container) {
    this.enemySpawner = new EnemySpawner(container);
  }

  activate(): void {
    IOC.entities.players = [
      new Player(
        UI.screen.width / 2,
        UI.screen.height - 72,
        this.container,
        Controls.keyboard
      ),
    ];
  }

  exit(): void {
    //
  }
  update(dt: number): void {
    this.enemySpawner.update(dt);
    this.collisionSystem();

    let k: keyof IIOC["entities"];

    for (k in IOC.entities) {
      IOC.entities[k].forEach((e) => e.update(dt));
      IOC.entities[k] = IOC.entities[k].filter((e) => !e.isDeleted);
    }
  }

  private collisionSystem() {
    IOC.entities.bullets.forEach((bullet) => {
      IOC.entities.enemies.forEach((enemy) => {
        if (bullet instanceof Bullet && enemy instanceof Enemy) {
          if (circleContainsPoint(bullet.body, enemy.body)) {
            bullet.collisions.push(enemy);
            enemy.collisions.push(bullet);
          }
        }
      });
    });
  }
}
