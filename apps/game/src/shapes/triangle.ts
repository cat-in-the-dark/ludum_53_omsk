import { Graphics } from "@pixi/graphics";
import { also } from "cat-lib";

export function triangle(
  x: number,
  y: number,
  width: number,
  height: number,
  color = 0xffffff
) {
  return also(new Graphics(), (it) => {
    it.x = x;
    it.y = y;
    it.beginFill(color);
    it.lineStyle(0, color, 1);
    it.moveTo(0, 0);
    it.lineTo(-width / 2, height);
    it.lineTo(width / 2, height);
    it.lineTo(0, 0);
    it.endFill();
  });
}

export function triangleDown(
  x: number,
  y: number,
  width: number,
  height: number,
  color = 0xffffff
) {
  return also(new Graphics(), (it) => {
    it.x = x;
    it.y = y;
    it.beginFill(color);
    it.lineStyle(0, color, 1);
    it.moveTo(0, 0);
    it.lineTo(-width / 2, -height);
    it.lineTo(width / 2, -height);
    it.lineTo(0, 0);
    it.endFill();
  });
}
