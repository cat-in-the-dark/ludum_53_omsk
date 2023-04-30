import { randomBetween } from "cat-lib";

export const UI = {
  screen: {
    width: 640,
    height: 640,
  },
};

export const BALANCE = {
  playerSpeed: 200,
  bulletSpeed: 600,
  enemySpawnCooldown: 2,
  bossEnemySpeed: () => randomBetween(10, 100),
  enemySpeed: () => randomBetween(50, 200),
  minEnemySize: 24,
  maxEnemySize: 72,
  minEnemyHp: 1,
  maxGenericEnemyHp: 4,
  maxEnemyHp: 10, // boss
  enemySpawnX: () => randomBetween(32, UI.screen.width - 32),
  enemySpawnY: () => randomBetween(-64, -48),
  minSpawn: 0.2,
  maxSpawn: 2,
  spawnTimeScale: 2,
  playerArea: {
    minY: UI.screen.height - 128,
    maxY: UI.screen.height - 48,
    minX: 32,
    maxX: UI.screen.width - 32,
  },
};

export interface IControls {
  id: string;
  left: string;
  right: string;
  up: string;
  down: string;
}

export const Controls: Record<string, IControls> = {
  keyboard: {
    id: "keyboard",
    left: "KeyA",
    right: "KeyD",
    up: "KeyW",
    down: "KeyS",
  },
};
