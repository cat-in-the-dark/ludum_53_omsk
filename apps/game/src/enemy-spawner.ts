import {
  Cooldown,
  IUpdateable,
  Vec2,
  clamp,
  randomBetween,
  remap,
} from "cat-lib";
import { BALANCE } from "./consts";
import { Enemy } from "./entities/enemy";
import { IOC } from "./state";
import { Container } from "@pixi/display";

export class EnemySpawner implements IUpdateable {
  private spawnCooldown = new Cooldown(BALANCE.enemySpawnCooldown);
  private time = 0;

  constructor(private container: Container) {}

  spawnEnemies() {
    const scaledTime = this.time / BALANCE.spawnTimeScale;

    const spawn = remap(
      -1,
      1,
      BALANCE.minSpawn,
      BALANCE.maxSpawn,
      Math.sin(scaledTime)
    );

    IOC.waveNumber = Math.ceil(scaledTime / (Math.PI * 2));

    const count = Math.round(IOC.waveNumber * spawn * BALANCE.maxSpawn);
    for (let i = 0; i < count; i++) {
      const speed = BALANCE.enemySpeed();
      const hp = randomBetween(BALANCE.minEnemyHp, this.maxHpWaveNumberBased);
      const dir = new Vec2(0, 1);
      const x = BALANCE.enemySpawnX();
      const y = BALANCE.enemySpawnY();

      const enemy = new Enemy(x, y, speed, dir, hp, this.container);
      IOC.entities.enemies.push(enemy);
    }
  }

  get maxHpWaveNumberBased() {
    return clamp(
      BALANCE.minEnemyHp + IOC.waveNumber,
      BALANCE.minEnemyHp,
      BALANCE.maxEnemyHp
    );
  }

  update(dt: number): void {
    this.time += dt;
    if (this.spawnCooldown.invoke()) {
      this.spawnEnemies();
    }

    this.spawnCooldown.update(dt);
  }
}
