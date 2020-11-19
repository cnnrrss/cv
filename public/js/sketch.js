var balls = [];
var num = 111;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  background(18, 18, 18);

  for (let i = 0; i < num; i++) {
    balls.push(new Ball(i));
  }
}

function draw() {
  background(18, 18, 18);

  for (let i = 0; i < num; i++) {
    balls[i].move(i);
    balls[i].disp();

    for (let j = 0; j < num; j++) {
      if (i !== j) {
        balls[i].connect(balls[j]);
      }
    }
  }
}

function Ball(i) {
  this.d = 1;
  let newR = random(i / 2, i);

  this.xPos = random(this.d + newR, width - this.d);
  this.yPos = random(this.d + newR, height - this.d / 1.15);
  this.xPosf = random(0.1, 0.335);
  this.yPosf = random(0.1, newR * 0.01);

  this.disp = function () {
    // fill(255);
    stroke(3, 218, 197);
    ellipse(this.xPos, this.yPos, this.d, this.d);
  };

  this.move = function (num) {
    // let r = num / 6;
    let constant = random(0.75, 2);

    if (isOdd(num)) {
      this.xPos += this.xPosf * constant;
      this.yPos -= this.yPosf * constant;
    } else {
      this.xPos -= this.xPosf * constant;
      this.yPos += this.yPosf * constant;
    }

    if (this.xPos > width - this.d / 2 || this.xPos < this.d / 2) {
      this.xPosf = this.xPosf * -1;
    }

    if (this.yPos > height - this.d / 2 || this.yPos < this.d / 2) {
      this.yPosf = this.yPosf * -1;
    }
  };

  this.connect = function (other) {
    if (dist(this.xPos, this.yPos, other.xPos, other.yPos) < 50) {
      stroke(3, 218, 197);
      line(this.xPos, this.yPos, other.xPos, other.yPos);
    }
  };
}

function isOdd(num) {
  return num % 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

window.onresize = function (event) {
  windowResized();
  draw();
};
