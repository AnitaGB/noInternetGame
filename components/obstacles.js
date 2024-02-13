import { Cactus } from "./cactus.js";
import { Pterodactyl } from "./pterodactyl.js";

export class Obstacles {
  all = [];
  jumping = false;
  canva;
  dino;
  interval;

  constructor(canvas, dino) {
    this.canva = canvas;
    this.dino = dino;
  }

  randomGenerate() {
    this.interval = setInterval(() => {
      this.destroy();
      const random = Math.random();
      const obj =
        random > 0.6
          ? new Pterodactyl(this.canva, random > 0.8, this.dino)
          : new Cactus(this.canva, this.dino);
      this.all.push(obj);
    }, 1200);
  }

  stopAll() {
    clearInterval(this.interval);
    this.all.forEach((_, i) => {
      this.all[i].stop = true;
    });
  }

  destroy() {
    this.all.forEach((v, i) => {
      if (v.stop) {
        delete this.all[i];
      }
    });
  }

  wasHit() {
    return this.all.some((v) => {
      const aPos = v.position;
      const bPos = this.dino.position;
      const a = v.dimensions;
      const b = this.dino.dimensions;
      if (
        aPos.x < bPos.x + b.width &&
        aPos.x + a.width > bPos.x &&
        aPos.y < bPos.y + b.height &&
        aPos.y + a.height > bPos.y
      ) {
        console.log("Hit!");
        return true;
      } else {
        return false;
      }
    });
  }
}
