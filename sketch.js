
const gravity = 0.3;
const numParticles = 1;
let particles=[];

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
  return random(60,100);
}
function createParticle(){
  colorMode(HSB, 100);
  
  return{
    pos:randomPosition(),
    vel:randomVelocity(),
    size:randomSize(),
    color: color(random(0, 15), 60, 90)
  }
}
function drawParticle(particle){
  fill(particle.color); 
  stroke('white');
  strokeWeight(4)
  noStroke();
  square(particle.pos.x,particle.pos.y,particle.size);
}
function update(){
  particles.forEach(particle => {
    particle.pos.x += particle.vel.x ;
    particle.pos.y += particle.vel.y ;
    if(particle.pos.x < 0 || particle.pos.x > width){
      particle.vel.x *= -1 ;

    }
    if(particle.pos.y > 800){
      particle.vel.y *= -1;
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
  createCanvas(windowWidth, windowHeight);
  for(i = 0 ; i<numParticles; i++){
   particles.push(createParticle()); 
  }
}

function mousePressed() {
  for(let i=0; i<8 ; i++){
  const particle =createParticle();
  particle.pos.x = mouseX;
  particle.pos.y = mouseY;
  particles.push(particle);
  }
}