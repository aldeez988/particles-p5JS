
const gravity = 0.1;
const numParticles = 1;
const bounciness = 0.9;
const maxNumOfParticles = 200;
let shouldBounce = true;
let particles=[];

let minHue;
 
function randomPosition (){
  const x =random(0,width);
  const y =random(0,height);

  return {
    x,
    y
  }
}
function randomVelocity (){
  let vec = p5.Vector.random2D().mult(random(2, 10));
  return { x: vec.x, y: vec.y};
}
function randomSize(){
  return random(4,20);
}
function createParticle(){
  colorMode(HSB, 100);
  
  return{
    pos:randomPosition(),
    vel:randomVelocity(),
    size:randomSize(),
    color: color(random(minHue, minHue + 30), 60, 90)
  }
}
function drawParticle(particle){
  fill(particle.color); 
  stroke('white');
  strokeWeight(4)
  noStroke();
  rectMode(CENTER);
  square(particle.pos.x, particle.pos.y, particle.size);
}
function update(){
  particles.forEach(particle => {
    particle.pos.x += particle.vel.x ;
    particle.pos.y += particle.vel.y ;
    if(particle.pos.x < 0 || particle.pos.x > width){
      particle.vel.x *= -1 ;

    }
    //bounce off floor
    if(shouldBounce && particle.pos.y > height){
      particle.vel.y *= - bounciness;
     }

  if (deviceOrientation && deviceOrientation.toLowerCase() === 'landscape'){
    particle.vel.x += gravity; 
  } else {    
    particle.vel.y += gravity; 
  }
});
}
function draw(){
  background("white");
  particles.forEach(particle => {
    drawParticle(particle);
  
  });
  update();
  limitNumberOfParticles();
  fill('black')
  text("d.o.: "+deviceOrientation, 10, 40);
}
function limitNumberOfParticles(){
  particles.splice(maxNumOfParticles);
}
function randomizeMinHue(){
  minHue = random(0, 70);
}
function makeBurst(){
  const x =random(0,width);
  const y =random(0,height);
  for(let i=0; i<100 ; i++){
    createParticleAtMouse(x,y);
  }
}
function setup(){
  randomizeMinHue();
  createCanvas(windowWidth, windowHeight);
  for(i = 0 ; i<numParticles; i++){
   particles.unshift(createParticle()); 
  }
  setInterval(makeBurst, 1000)
}

function mousePressed() {
  randomizeMinHue();
  for(let i=0; i<8 ; i++){
    createParticleAtMouse();
  }
}

function mouseDragged(){
  createParticleAtMouse(); 
}

function createParticleAtMouse(x,y){
    const particle =createParticle();
    particle.pos.x =x || mouseX;
    particle.pos.y = y || mouseY;
    particles.unshift(particle);
}
function keyPressed(){
  //particles = [];
  shouldBounce = !shouldBounce;
}
