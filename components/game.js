import { Canvas } from "./canvas.js";
import { Dinosaur } from "./dinosaur.js";
import { drawing } from "./drawing.js";
import { Obstacles } from "./obstacles.js";

export class Game extends drawing {
  startTime = null;
  score = 0;
  on = false;
  dino;
  obstacles;
  floor;

  constructor() {
    super({ height: 250, width: 1000 }, undefined, new Canvas().canvasElement);

    this.dino = new Dinosaur(this.canva);
    this.obstacles = new Obstacles(this.canva, this.dino);
    this.controls();
    this.dino.stop();
    this.floor = new Floor(this.canva);
  }

  controls() {
    //for mobile
    document.addEventListener("touchstart", () => {
      if (this.on === false) {
        this.start();
        this.dino.stop();
      } else if (this.dino.jumping === false) {
        this.dino.jump();
      }
    });
    //for desktop
    document.addEventListener("keydown", (e) => {
      const charCode = e.code;

      switch (charCode) {
        case "Space":
          if (this.on === false) {
            this.start();
            this.dino.stop();
          } else if (this.dino.jumping === false) {
            this.dino.jump();
          }

          break;
        case "ArrowDown":
          if (this.dino.jumping === false) {
            this.dino.crouch();
          }

          break;
        default:
          console.log("No action!");
      }
    });
  }

  start() {
    this.score = null;
    this.startTime = null;
    this.on = true;
    this.obstacles.destroy();
    this.cleanImage();
    this.floor.drawStraightLine();
    console.log("Start!");

    window.requestAnimationFrame(this.loop.bind(this));
    this.obstacles.randomGenerate();
  }

  loop(timeStamp) {
    this.floor.drawStraightLine();
    this.startTime = this.startTime === null ? timeStamp : this.startTime;
    this.score = Math.round((timeStamp - this.startTime) / 100);
    this.writeText(this.score);
    if (this.obstacles.wasHit()) {
      this.obstacles.stopAll();
      this.on = false;
      window.cancelAnimationFrame(this.loop.bind(this));
      this.dino.jumping = false;
      console.log("Cancelar!");
    } else {
      window.requestAnimationFrame(this.loop.bind(this));
    }
  }
}

class Floor extends drawing {
  constructor(canva) {
    super({ height: 1, width: 1000 }, { x: 0, y: 107 }, canva);
    this.drawStraightLine();
  }
}
