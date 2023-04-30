import { UI } from "./consts";

export function outOfScreen(x: number, y: number): boolean {
  return x > UI.screen.width || x < 0 || y > UI.screen.height || y < 0;
}
