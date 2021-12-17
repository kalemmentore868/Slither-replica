import { Snake } from "./Snake.js";

export class CpuSnake extends Snake {
  constructor(x, y, size) {
    super(x, y, size);
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
