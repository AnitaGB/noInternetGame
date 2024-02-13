import { drawing } from "./drawing.js";

export class EnemyDrawing extends drawing {
  dino;
  image;
  stop = false;

  constructor(
    dimensions = { height: 0, width: 0 },
    position = { x: 0, y: 0 },
    canva,
    image,
    dino
  ) {
    super(dimensions, position, canva);
    this.dino = dino;
    this.image = image;
  }

  startEnemy() {
    this.draw(this.image);
    console.log("Enemy!");

    const originalPositionX = this.position.x;
    let addingNumber = 0;
    const interval = setInterval(() => {
      if (this.stop) {
        clearInterval(interval);
      } else if (this.position.x <= 0) {
        clearInterval(interval);
        this.cleanImage();
        this.stop = true;
      } else {
        addingNumber -= 5;

        this.position.x = originalPositionX + addingNumber;

        this.draw(this.image);
      }
    }, 50);
  }
}
