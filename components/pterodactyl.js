import { EnemyDrawing } from "./enemyDrawing.js";

export class Pterodactyl extends EnemyDrawing {
  constructor(canvas, low, dino) {
    const dimensions = { height: 30, width: 30 };
    const ptero = new Image(dimensions.width, dimensions.height);
    ptero.src = "./../images/pterodactyl.png";
    super(dimensions, { x: 350, y: low ? 60 : 30 }, canvas, ptero, dino);

    this.startEnemy();
  }
}
