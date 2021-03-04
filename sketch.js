var toLeft = 0;
var toUp = 0;
var takes = 0;
var tail = 1;
var tailX = [32];
var tailY = [116];
var cutSnake = false;
var cutPlace;
var speed = 5;
var gameOver = true;
var speeder = 0;
var lr1 = 40,
  lr2 = 40,
  ud1 = 108,
  ud2 = 124,
  lr3 = 54,
  ud3 = 116;
var moveStep = 32;
var turnUp = false;
var turnRight = false;
var turnDown = false;
var turnLeft = false;
var posit = [];
var shapes = [1, 2, 3];
for (let i = 0; i < 20; i++) {
  posit.push(i)
}
var foodsa;
var foodsx;
var foodsy;
var soundEat;
var soundBoom;
function startAgain() {
  toLeft = 0;
  toUp = 0;
  takes = 0;
  speed = 5;
  gameOver = true;
  speeder = 0;
  tailX = [32];
  tailY = [116];
  lr1 = 40;
  lr2 = 40;
  ud1 = 108;
  ud2 = 124;
  lr3 = 54;
  ud3 = 116;

  moveStep = 32;
  turnUp = false;
  turnRight = false;
  turnDown = false;
  turnLeft = false;
  reset.position(-windowWidth, 70);

  randomThem();
}


function randomThem() {
  foodsa = random(shapes);
  foodsx = random(posit);
  foodsy = random(posit);
}


function keyPressed() {
    console.log(cutSnake);
  console.log(cutPlace);

  console.log(tailX);
  if (keyCode === LEFT_ARROW) {
    turnLeft = true;
    turnUp = false;
    turnDown = false;
    turnRight = false;

    lr1 = 24;
    lr2 = 24;
    ud1 = 108;
    ud2 = 124;
    lr3 = 17;
    ud3 = 110;

  } else if (keyCode === RIGHT_ARROW) {
    turnUp = false;
    turnRight = true;
    turnDown = false;
    turnLeft = false;

    lr1 = 40;
    lr2 = 40;
    ud1 = 108;
    ud2 = 124;
    lr3 = 54;
    ud3 = 116;

  } else if (keyCode === UP_ARROW) {
    turnLeft = false;
    turnUp = true;
    turnRight = false;
    turnDown = false;

    lr1 = 40;
    lr2 = 24;
    ud1 = 108;
    ud2 = 108;
    lr3 = 30;
    ud3 = 95;


  } else if (keyCode === DOWN_ARROW) {
    turnLeft = false;
    turnRight = false;
    turnDown = true;
    turnUp = false;

    lr1 = 40;
    lr2 = 24;
    ud1 = 124;
    ud2 = 124;
    lr3 = 40;
    ud3 = 132;

  }
}


function setup() {

  soundFormats('wav');
  soundEat = loadSound('eat');
  soundBoom = loadSound('boom');

  canvs = createCanvas(672, 772);
  randomThem();
  reset = createButton("Play Again");
  reset.position(-windowWidth, 70);
  reset.mousePressed(startAgain);

}

function addIt() {
      tailX.unshift(32 + toLeft);
      tailY.unshift(116 + toUp);
      tailX.pop();
      tailY.pop();

}

function draw() {
  canvs.center("horizontal");

  frameRate(speed);
  background(0, 171, 6);

  fill(19, 102, 0);
  rect(0, 0, width, 100);
  if (gameOver) {
    
    if (turnUp && toUp > -1) {
      toUp -= moveStep;
    }
    if (turnRight && toLeft < 609) {
      toLeft += moveStep;
    }
    if (turnDown && toUp < 609) {
      toUp += moveStep;
    }
    if (turnLeft && toLeft > -1) {
      toLeft -= moveStep;
    }
    addIt();
  }
  cutIt();

  noStroke();
  textSize(30);
  fill(135, 179, 34);
  text("Foods " + takes, 25, 75);
  text("Speed " + speed * 10, 520, 75);

  if (toUp < 0 || toUp > 608 || toLeft < 0 || toLeft > 608) {
    text("Game Over", 250, 50);
    if (gameOver) {
      soundBoom.play();
    }
    gameOver = false;
    reset.position(windowWidth / 2 - 45, 70);
  }

  let turnIt = true;

  for (let i = 0; i < 10; i++) {
    let x;

    for (let j = 0; j < 20; j++) {
      fill(135, 179, 34);

      if (turnIt) {
        x = 16;
      } else {
        x = 48;
      }

      square(i * 64 + x, 100 + j * 32, 32);
      if (turnIt) {
        turnIt = false;
      } else {
        turnIt = true;
      }

    }
  }

  for (let i = 0; i < 10; i++) {
    let x;

    for (let j = 0; j < 20; j++) {
      fill(116, 166, 0);

      if (turnIt) {
        x = 48;
      } else {
        x = 16;
      }

      square(i * 64 + x, 100 + j * 32, 32);
      if (turnIt) {
        turnIt = false;
      } else {
        turnIt = true;
      }

    }
  }
  


  stroke(200);
  strokeWeight(1);
  for (let i = 0; i < 21; i++) {
    line(i * 32 + 16, 100, i * 32 + 16, 740);
  }
  
  for (let i = 0; i < 21; i++) {
    line(16, 100 + i * 32, 656, 100 + i * 32);
  }

  stroke(0);
  fill(200, 20, 150);
  foods();
  strokeWeight(3);

  stroke(0);
  fill(100);

  for (let i = 0; i < tailX.length; i++) {
    ellipse(tailX[i], tailY[i], 31);
  }
  
  
    



  strokeWeight(5);
  stroke(214, 0, 29);
  point(lr1 + toLeft, ud1 + toUp);
  point(lr2 + toLeft, ud2 + toUp);
  strokeWeight(1);

  noFill();
  arc(lr3 + toLeft, ud3 + toUp, 10, 10, HALF_PI, PI);


  strokeWeight(1);
  stroke(0);
  line(16, 100, 656, 100);
  line(16, 100, 16, 740);
  line(16, 740, 656, 740);
  line(656, 100, 656, 740);

  if ((toLeft / 32) == foodsx && (toUp / 32) == foodsy) {
    soundEat.play();
    tailX.push(32 + toLeft);
    tailY.push(116 + toUp);
    tail++;
    speeder++;
    randomThem();
  }
takes = tailX.length-1;
  
  if (speeder == 3) {
    speed += 0.5;
    speeder = 0;
  }


}

function cutIt() {
    for (let i = 1; i < tailX.length; i++) {
    if (tailX[0] == tailX[i] && tailY[0] == tailY[i]) {
      cutPlace = i - 1;
      cutSnake = true;
      break;
    }
  }

  if (cutSnake) {
    tailX = tailX.slice(0, cutPlace);
    tailY = tailY.slice(0, cutPlace);
    cutSnake = false;
  }}



function foods() {
  if (foodsa == 1) {
    square(foodsx * 32 + 16, 100 + foodsy * 32, 32);
  }
  if (foodsa == 2) {
    ellipse(foodsx * 32 + 32, 116 + foodsy * 32, 32);
  }
  if (foodsa == 3) {
    triangle(foodsx * 32 + 16, 124 + foodsy * 32, foodsx * 32 + 32, foodsy * 32 + 100, foodsx * 32 + 48, foodsy * 32 + 124);
  }

}