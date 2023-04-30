import { remap } from "cat-lib";
import { IEntity } from "./entities/entity";
import { BALANCE } from "./consts";

export type IIOC = {
  waveNumber: number;
  entities: {
    bullets: IEntity[];
    enemies: IEntity[];
    players: IEntity[];
  };
};

export const IOC: IIOC = {
  waveNumber: 1,
  entities: {
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
