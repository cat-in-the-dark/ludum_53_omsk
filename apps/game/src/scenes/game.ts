import { Container } from "@pixi/display";
import {
  IScene,
  circleContainsPoint,
  rectIsIntersect,
  sceneManager,
} from "cat-lib";
import { Player } from "../entities/player";
import { Controls, UI } from "../consts";
import { EnemySpawner } from "../enemy-spawner";
import { IIOC, IOC, resetIOC } from "../state";
import { Bullet } from "../entities/bullet";
import { Enemy } from "../entities/enemy";
import { Powerup } from "../entities/powerup";
import { PowerSpawner } from "../power-spawner";

export class GameScene implements IScene {
  private enemySpawner: EnemySpawner;
  private powerSpawner: PowerSpawner;

  constructor(public container: Container) {
    this.enemySpawner = new EnemySpawner(container);
    this.powerSpawner = new PowerSpawner(container);
  }

  activate(): void {
    resetIOC();

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
    this.container.removeChildren();
  }
  update(dt: number): void {
    this.enemySpawner.update(dt);
    this.powerSpawner.update(dt);
    this.collisionSystem();

    let k: keyof IIOC["entities"];

    for (k in IOC.entities) {
      IOC.entities[k].forEach((e) => e.update(dt));
      IOC.entities[k] = IOC.entities[k].filter((e) => !e.isDeleted);
    }

    if (IOC.entities.players.length == 0) {
      console.log("GAMEOVER");
      sceneManager.set("gameOver");
    }
  }

  private collisionSystem() {
    IOC.entities.enemies.forEach((enemy) => {
      if (enemy instanceof Enemy) {
        const eb = enemy.body;
        IOC.entities.bullets.forEach((bullet) => {
          if (bullet instanceof Bullet) {
            if (circleContainsPoint(bullet.body, eb)) {
              bullet.collisions.push(enemy);
              enemy.collisions.push(bullet);
            }
          }
        });

        IOC.entities.players.forEach((player) => {
          if (player instanceof Player) {
            if (
              // dummy circle triangle collision
              circleContainsPoint(player.p1, eb) ||
              circleContainsPoint(player.p2, eb) ||
              circleContainsPoint(player.p2, eb)
            ) {
              enemy.playerCollisions.push(player);
            }
          }
        });
      }
    });

    IOC.entities.players.forEach((player) => {
      IOC.entities.powerups.forEach((powerup) => {
        if (player instanceof Player && powerup instanceof Powerup) {
          if (rectIsIntersect(player.body, powerup.body)) {
            powerup.collision(player);
          }
        }
      });
    });
  }
}
