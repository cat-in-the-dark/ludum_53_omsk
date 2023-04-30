import { Cooldown, IUpdateable, randomBetween } from "cat-lib";
import { BALANCE } from "./consts";
import { IOC } from "./state";
import { Container } from "@pixi/display";
import { atkSpeedPowerup, extraBulletsPowerup } from "./entities/powerup";

export class PowerSpawner implements IUpdateable {
  private spawnCooldown = new Cooldown(BALANCE.powerups.cooldown);
  private powerups = [
    atkSpeedPowerup,
    extraBulletsPowerup,
    extraBulletsPowerup,
  ];

  constructor(private container: Container) {}

  spawnPowerup() {
    if (this.powerups.length == 0) {
      return;
    }
    const id = Math.floor(randomBetween(0, this.powerups.length));
    const x = BALANCE.powerups.spawnX();
    const y = BALANCE.powerups.spawnY();
    const powerup = this.powerups[id]?.(x, y, this.container);
    IOC.entities.powerups.push(powerup);
  }

  update(dt: number): void {
    if (this.spawnCooldown.invoke()) {
      this.spawnPowerup();
    }
    this.spawnCooldown.update(dt);
  }
}
