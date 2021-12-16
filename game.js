import { PlayerSnake } from "./PlayerSnake.js";
import { Apple } from "./Apple.js";
import { CpuSnake } from "./CpuSnake.js";

let canvas = document.getElementById("canvas");

let snake = new PlayerSnake(20, 20, 20);

let cpuSnake = new CpuSnake(100, 100, 20);

const appleList = [];

for (let i = 0; i < 10; i++) {
  let apple = new Apple(snake);
  appleList.push(apple);
}

// let apple = new Apple(snake);

let canvasContext = canvas.getContext("2d");

window.onload = () => {
  gameLoop();
};

function gameLoop() {
  setInterval(show, 1000 / 15); // here 15 is our fps value
}

function show() {
  update();
  draw();
}

function update() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  snake.move();
  cpuSnake.move();
  eatApple(snake);
  eatApple(cpuSnake);
  checkHitWall(snake);
  checkHitWall(cpuSnake);
  snakeCollision();
}

function checkHitWall(snakey) {
  let headTail = snakey.tail[snakey.tail.length - 1];
  if (headTail.x == -snakey.size) {
    headTail.x = canvas.width - snakey.size;
  } else if (headTail.x == canvas.width) {
    headTail.x = 0;
  } else if (headTail.y == -snakey.size) {
    headTail.y = canvas.height - snakey.size;
  } else if (headTail.y == canvas.height) {
    headTail.y = 0;
  }
}

function snakeCollision() {
  let headTail = snake.tail[snake.tail.length - 1];

  cpuSnake.tail.map((box) => {
    if (headTail.x == box.x && headTail.y == box.y) {
      snake.tail = [{ x: 20, y: 20 }];
      while (appleList.length > 10) {
        appleList.shift();
      }
    }
  });

  let cpuHeadTail = cpuSnake.tail[cpuSnake.tail.length - 1];

  let applesToMake = cpuSnake.tail.length;
  snake.tail.map((box) => {
    if (cpuHeadTail.x == box.x && cpuHeadTail.y == box.y) {
      for (let i = 0; i < applesToMake; i++) {
        if (i % 2 == 0) {
          let apple = new Apple(cpuSnake);
          apple.x = box.x + i * 10;
          apple.y = box.y + i * 10;
          appleList.push(apple);
        }
        cpuSnake.tail = [{ x: 100, y: 100 }];
      }
    }
  });
}

function eatApple(snake) {
  appleList.map((apple) => {
    if (
      snake.tail[snake.tail.length - 1].x == apple.x &&
      snake.tail[snake.tail.length - 1].y == apple.y
    ) {
      snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
      apple.x =
        Math.floor((Math.random() * canvas.width) / snake.size) * snake.size;
      apple.y =
        Math.floor((Math.random() * canvas.height) / snake.size) * snake.size;
    }
  });
}

function draw() {
  createRect(0, 0, canvas.width, canvas.height, "black");
  createRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.tail.length; i++) {
    createRect(
      snake.tail[i].x + 2.5,
      snake.tail[i].y + 2.5,
      snake.size - 5,
      snake.size - 5,
      "white"
    );
  }

  for (let i = 0; i < cpuSnake.tail.length; i++) {
    createRect(
      cpuSnake.tail[i].x + 2.5,
      cpuSnake.tail[i].y + 2.5,
      cpuSnake.size - 5,
      cpuSnake.size - 5,
      "blue"
    );
  }

  canvasContext.font = "20px Arial";
  canvasContext.fillStyle = "#00FF42";
  canvasContext.fillText(
    `Score: ${snake.tail.length - 1}`,
    canvas.width - 120,
    18
  );

  appleList.map((apple) => {
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
  });
}

function createRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (event) => {
  setTimeout(() => {
    if (event.keyCode == 37 && snake.rotateX != 1) {
      snake.rotateX = -1;
      snake.rotateY = 0;
    } else if (event.keyCode == 38 && snake.rotateY != 1) {
      snake.rotateX = 0;
      snake.rotateY = -1;
    } else if (event.keyCode == 39 && snake.rotateX != -1) {
      snake.rotateX = 1;
      snake.rotateY = 0;
    } else if (event.keyCode == 40 && snake.rotateY != -1) {
      snake.rotateX = 0;
      snake.rotateY = 1;
    }
  }, 1);
});

setInterval(() => {
  cpuSnake.changeDirection();
}, 4000);
