import { Snake } from "./Snake.js";

export class CpuSnake extends Snake {
  constructor(x, y, size) {
    super(x, y, size);
  }

  move() {
    let newRect;
    if (this.rotateX == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x + this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateX == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x - this.size,
        y: this.tail[this.tail.length - 1].y,
      };
    } else if (this.rotateY == 1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y + this.size,
      };
    } else if (this.rotateY == -1) {
      newRect = {
        x: this.tail[this.tail.length - 1].x,
        y: this.tail[this.tail.length - 1].y - this.size,
      };
    }

    this.tail.shift();
    this.tail.push(newRect);
  }

  changeDirection() {
    let randomNum = Math.floor(Math.random() * 11);
    switch (true) {
      case this.rotateX == 0:
        randomNum >= 5 ? (this.rotateX = 1) : (this.rotateX = -1);
        break;
      case this.rotateY == 0:
        randomNum >= 5 ? (this.rotateY = 1) : (this.rotateY = -1);
        break;
      case this.rotateX != 0:
        randomNum >= 5 ? (this.rotateY = 1) : (this.rotateY = -1);
        this.rotateX = 0;
        break;
      case this.rotateY != 0:
        randomNum >= 5 ? (this.rotateX = 1) : (this.rotateX = -1);
        this.rotateY = 0;
        break;
    }
  }
}
