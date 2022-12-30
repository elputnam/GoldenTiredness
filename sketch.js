// Animation for Trio Tan

//Gradient
const Y_AXIS = 1;
let c1, c2;
let mix;
let mixer;
let pixX1;
let pixY1;
let pixX2;
let pixY2;

//Squares
let deg1 = 0;
let deg2 = 0;
let alp = 100;
let inc = 0.25;

//Screens
let screens = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(20);
  background(0);
  //Gradient
  c1 = color(300, 10, 100, 1);
  c2 = color(150, 100, 10, 1);
  mix = 0;
  mixer = 0.001;
  pixX1 = width/2;
  pixY1 = height/2;
  pixX2 = width/2;
  pixY2 = height/2;

  //screens
  // for (let i = 0; i < 100; i++){
  //   screens[i]= new Screen();
  // }

}

function draw() {
    
   //Gradient
   setGradient(0, 0, width, height, c1, c2, Y_AXIS);
   mix += mixer;

  if (mix > 2 || mix < 0){
    mixer *= -1;}

  squares();
  
  // for (let i = 0; i < screens.length; i++){
  // screens[i].update();
  // screens[i].edges();
  // screens[i].display();
  // }
  
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === Y_AXIS){
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, mix);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

class Screen{
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;

  }

  update(){
    // this.acc.add(random(-0.5, 0.5), random(-0.5, 0.5))
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display(){
    stroke(0, alp);
    fill(255, 1);
    // for (let i = 0; i < 10; i++){
      rectMode(CENTER)
      rect(this.pos.x, this.pos.y, random(10), random(10));
    // }
  }

  edges(){
    if (this.pos.x < 0){
      this.pos.x = width;
    } 
    if (this.pos.x > width){
      this.pos.x = 0;
    }
    if (this.pos.y < 0){
      this.pos.y = height;
    } 
    if (this.pos.y > height){
      this.pos.y = 0;
    }
  }
}

function squares(){
  //SCREEN1
  push();
  translate(pixX1, pixY1);
  rotate(deg1);
    for (let i = 0; i<150; i++){ 
      // noStroke();
      stroke(0, alp);
      fill(255, 1);
      rectMode(CENTER)
      rect(0, 0, 4*i, 8*i);
    }
  pop();
  deg1 += 0.005;

  pixX1 += random(-1, 1);
  pixY1 += random(-1, 1);

  if (pixX1 < 100){
    pixX1 = width-100;
  } else if (pixX1 > width-100) {
    pixX1 = 100;
  }

  if (pixY1 < 100){
    pixY1 = height-100;
  } else if (pixY1 > height-100){
    pixY1 = 100;
  }

  //Screen 2
  push();

  translate(pixX2, pixY2);
  rotate(deg2);
    for (let i = 0; i<150; i++){ 
      // noStroke();
      stroke(0, alp);
      fill(255, 1);
      rectMode(CENTER)
      rect(0, 0, 10*i, 2*i);
    }
  pop();

  alp += inc;

  pixX2 += random(-1, 1);
  pixY2 += random(-1, 1);

  deg2 -= 0.005;

  if (alp < 0 || alp > 100){
    inc *= -1;
  }

  if (pixX2 < 100){
    pixX2 = width-100;
  } else if (pixX2 > width-100) {
    pixX2 = 100;
  }

  if (pixY2 < 100){
    pixY2 = height-100;
  } else if (pixY2 > height-100){
    pixY2 = 100;
  }
}

function mousePressed(){
  let fs = fullscreen();
  fullscreen(!fs);
}