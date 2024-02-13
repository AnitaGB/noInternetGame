import { drawing } from "./drawing.js";

export class Dinosaur extends drawing {
  dino;
  jumping = false;
  initialPosition;

  constructor(canvas) {
    super({ height: 40, width: 25 }, { x: 10, y: 70 }, canvas);
    this.dino = new Image(this.dimensions.width, this.dimensions.height);
    this.dino.src = "images/dino.png";
    this.initialPosition = { x: this.position.x, y: this.position.y };
  }

  jump() {
    console.log("Jumping");
    this.jumping = true;

    const originalPositionY = this.position.y;
    let addingNumber = 0;
    let up = true;
    let speed = 30;
    let newSpeed = speed;
    let interval;

    const intervalFunc = () => {
      if (this.jumping) {
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
          calculateSpeed(this.position.y);

          if (newSpeed !== speed) {
            speed = newSpeed;
            clearInterval(interval);
            interval = setInterval(intervalFunc, speed);
          }
        }
      } else {
        clearInterval(interval);
      }
    };
    if (this.jumping) {
      interval = setInterval(intervalFunc, speed);
    } else {
      clearInterval(interval);
    }

    function calculateSpeed(position) {
      const x = (originalPositionY - position) / 10;
      newSpeed = 5 * x ** 2 - 18 * x + 25;
      console.log("x = " + x + " newSpeed = " + newSpeed);
    }
  }

  crouch() {
    console.log("Crouching");
  }

  run() {
    this.jumping = false;
    console.log("Running");
  }

  stop() {
    this.position.x = this.initialPosition.x;
    this.position.y = this.initialPosition.y;
    this.draw(this.dino);
    console.log("Stopped");
  }
}
