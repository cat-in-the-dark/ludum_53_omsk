import { remap } from "cat-lib";
import { IEntity } from "./entities/entity";
import { BALANCE } from "./consts";

export type IIOC = {
  waveNumber: number;
  entities: {
    powerups: IEntity[];
    bullets: IEntity[];
    enemies: IEntity[];
    players: IEntity[];
  };
};

export function resetIOC() {
  IOC.waveNumber = 1;
  IOC.entities = {
    powerups: [],
    bullets: [],
    enemies: [],
    players: [],
  };
}

export const IOC: IIOC = {
  waveNumber: 1,
  entities: {
    powerups: [],
    bullets: [],
    enemies: [],
    players: [],
  },
};

export function enemySize(hp: number) {
  return remap(
    BALANCE.minEnemyHp,
    BALANCE.maxEnemyHp,
    BALANCE.minEnemySize,
    BALANCE.maxEnemySize,
    hp
  );
}
