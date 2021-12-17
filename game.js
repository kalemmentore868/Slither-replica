import { PlayerSnake } from "./PlayerSnake.js";
import { Apple } from "./Apple.js";
import { CpuSnake } from "./CpuSnake.js";

let canvas = document.getElementById("canvas");

let snake = new PlayerSnake(20, 20, 20);

const cpuSnakeList = [];

const appleList = [];

for (let i = 1; i < 11; i++) {
  let apple = new Apple(snake);
  appleList.push(apple);

  let cpuSnake = new CpuSnake(i * 10, i * 10, 20);
  cpuSnakeList.push(cpuSnake);
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
  eatApple(snake);
  checkHitWall(snake);
  cpuSnakeList.map((cpuSnake) => {
    eatApple(cpuSnake);
    cpuSnake.move();
    checkHitWall(cpuSnake);
  });
  snakeCollision(cpuSnakeList);
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

function snakeCollision(cpuSnakeList) {
  cpuSnakeList.map((cpuSnake) => {
    let headTail = snake.tail[snake.tail.length - 1];
    let cpuHeadTail = cpuSnake.tail[cpuSnake.tail.length - 1];

    if (
      headTail.x == cpuHeadTail.x &&
      headTail.y == cpuHeadTail.y &&
      snake.score < cpuSnake.score
    ) {
      snake.tail = [{ x: 20, y: 20 }];
    } else if (
      headTail.x == cpuHeadTail.x &&
      headTail.y == cpuHeadTail.y &&
      snake.score > cpuSnake.score
    ) {
      cpuSnake.tail = [{ x: 100, y: 100 }];
    }

    cpuSnake.tail.map((box, index) => {
      if (headTail.x == box.x && headTail.y == box.y) {
        snake.tail = [{ x: 20, y: 20 }];
        while (appleList.length !== 10) {
          if (appleList.length > 10) {
            appleList.shift();
          } else {
            appleList.push({ x: index * 10, y: index * 10 });
          }
        }
      }
    });

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
      snake.score += 1;
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

  cpuSnakeList.map((cpuSnake) => {
    for (let i = 0; i < cpuSnake.tail.length; i++) {
      createRect(
        cpuSnake.tail[i].x + 2.5,
        cpuSnake.tail[i].y + 2.5,
        cpuSnake.size - 5,
        cpuSnake.size - 5,
        "blue"
      );
    }
  });

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

cpuSnakeList.map((cpuSnake, index) => {
  let randumNum = (index + 1) * 1000;

  setInterval(() => {
    cpuSnake.changeDirection();
  }, randumNum);
});
