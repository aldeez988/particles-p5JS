
const numParticles = 200;
let particles=[];
const gravity = 0.4;
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
function createParticle(){
  colorMode(HSB, 1);
  
  return{
    pos:randomPosition(),
    vel:randomVelocity(),
    size:random(10,30),
    color: color(random([0, 0.1]), 0.4, 1)
  }
}
function drawParticle(particle){
  fill(particle.color); 
  stroke('white');
  strokeWeight(4)
  noStroke();
  circle(particle.pos.x,particle.pos.y,particle.size);
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
  frameRate(100)
  createCanvas(windowWidth, windowHeight);
  for(i = 0 ; i<numParticles; i++){
   particles.push(createParticle()); 
  }
}