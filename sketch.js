
const gravity = 0.3;
const numParticles = 1;
const bounciness = 0.9;
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
  const x =random(-5,5);
  const y =random(-5,5);
  return {
    x,
    y
  }
}
function randomSize(){
  return random(20,100);
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
  circle(particle.pos.x, particle.pos.y, particle.size);
}
function update(){
  particles.forEach(particle => {
    particle.pos.x += particle.vel.x ;
    particle.pos.y += particle.vel.y ;
    if(particle.pos.x < 0 || particle.pos.x > width){
      particle.vel.x *= -1 ;

    }
    //bounce off floor
    if(particle.pos.y > 800){
      particle.vel.y *= - bounciness;
     }
    particle.vel.y += gravity; 
  });
}
function draw(){
  background("white");
  particles.forEach(particle => {
    drawParticle(particle);
  
  });
  update();
}
function setup(){
  minHue = random(0, 70);

  createCanvas(windowWidth, windowHeight);
  for(i = 0 ; i<numParticles; i++){
   particles.push(createParticle()); 
  }
}

function mousePressed() {
  for(let i=0; i<8 ; i++){
    createParticleAtMouse();
  }
}
function mouseDragged(){
  createParticleAtMouse(); 
}

function createParticleAtMouse(){
    const particle =createParticle();
    particle.pos.x = mouseX;
    particle.pos.y = mouseY;
    particles.push(particle);
}
function keyPressed(){
  particles = [];
}