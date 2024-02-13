import { drawing } from "./drawing.js";

export class Dinosaur extends drawing {
  dino;
  jumping = false;

  constructor(canvas) {
    super({ height: 40, width: 25 }, { x: 10, y: 70 }, canvas);
    this.dino = new Image(this.dimensions.width, this.dimensions.height);
    this.dino.src = "../images/dino.png";
  }

  jump() {
    console.log("Jumping");
    this.jumping = true;

    const originalPositionY = this.position.y;
    let addingNumber = 0;
    let up = true;
    const interval = setInterval(() => {
      if (addingNumber < -60) {
        up = false;
      }
      if (addingNumber === 0 && up === false) {
        this.jumping = false;
        clearInterval(interval);
        this.run();
      } else {
        addingNumber = up ? addingNumber - 5 : addingNumber + 5;

        this.position.y = originalPositionY + addingNumber;

        this.draw(this.dino);
      }
    }, 40);
  }

  crouch() {
    console.log("Crouching");
  }

  run() {
    this.jumping = false;
    console.log("Running");
  }

  stop() {
    this.draw(this.dino);
    console.log("Stopped");
  }
}
