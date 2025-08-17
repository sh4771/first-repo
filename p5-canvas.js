// Function for first canvas
function sketch1(p) {
  p.setup = function () {
    p.createCanvas(720, 200);
    p.background(145);
  };
  p.draw = function () {
    p.circle(p.mouseX, p.mouseY, 100);
  };
}

// Run first p5 instance
new p5(sketch1);

// Function for second canvas
function sketch2(p) {
  p.setup = function () {
    p.createCanvas(720, 200);
    p.background(145);
    p.fill(240,140,140);
  };
  p.draw = function () {
    p.square(p.mouseX, p.mouseY, 50);
  };
}

// Run second p5 instance
new p5(sketch2);