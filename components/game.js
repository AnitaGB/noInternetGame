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

  constructor() {
    super({ height: 250, width: 1000 }, undefined, new Canvas().canvasElement);
    this.dino = new Dinosaur(this.canva);
    this.obstacles = new Obstacles(this.canva, this.dino);

    this.controls();
    this.dino.stop();
  }

  controls() {
    document.addEventListener("keydown", (e) => {
      const charCode = e.code;

      switch (charCode) {
        case "Space":
          if (this.on === false) {
            this.start();
            this.dino.jump();
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
    this.on = true;
    this.obstacles.destroy();
    this.cleanImage();
    console.log("Start!");
    window.requestAnimationFrame(this.loop.bind(this));
    this.obstacles.randomGenerate();
  }

  loop(timeStamp) {
    this.startTime = this.startTime === null ? timeStamp : this.startTime;
    this.score = Math.round((timeStamp - this.startTime) / 100);
    this.writeText(this.score);
    if (this.obstacles.wasHit()) {
      this.obstacles.stopAll();
      this.on = false;
      window.cancelAnimationFrame(this.loop.bind(this));
      console.log("Cancelar!");
    } else {
      window.requestAnimationFrame(this.loop.bind(this));
    }
  }
}
