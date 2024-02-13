import { EnemyDrawing } from "./enemyDrawing.js";

export class Cactus extends EnemyDrawing {
  constructor(canvas, dino) {
    const dimensions = { height: 20, width: 20 };
    const cactus = new Image(dimensions.width, dimensions.height);
    cactus.src = "images/cactus-sprite.png";
    super(dimensions, { x: 350, y: 87 }, canvas, cactus, dino);
    this.startEnemy();
  }
}
