var g1,g2,g3,g4;
var turn;
var score;
var gameState;

var particle;
var plinkos = [];
var divisions = [];

var divisionHeight = 200;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function setup() {
  createCanvas(800,670);
  engine = Engine.create();
  world = engine.world;

  g1 = new ground(width/2,670,width,20);
  g2 = new ground(0,height/2,5,height);
  g3 = new ground(width/2,0,width,5);
  g4 = new ground(800,height/2,5,height);

  for(var k = 0; k <= width; k = k + 80){
    divisions.push(new division(k, height-divisionHeight/2, 5, divisionHeight));
  }

  for(var j = 15; j <= width-10; j = j + 50){
    plinkos.push(new plinko(j, 175,7));
  }
  for(var j = 40; j <= width; j = j + 50){
    plinkos.push(new plinko(j, 75,7));
  } 
  for(var j = 40; j <= width-20; j = j + 50){
    plinkos.push(new plinko(j, 275,7));
  } 
  for(var j = 15; j <= width; j = j + 50){
    plinkos.push(new plinko(j, 375,7));
  } 

  gameState  = "start";
  
  turn = 0;
  score = 0;


  Engine.run(engine);  
}

function draw(){
  background(0);
  g1.display(); 
  g2.display();
  g3.display(); 
  g4.display();
  for(var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }
  
  for(var j = 0; j < plinkos.length; j++){
    plinkos[j].display();
  }

  for(t = 20; t < 320; t = t + 80){
    textSize(25);
    text("500", t, 490);
  }
  for(i = 340; i < 560; i = i + 80){
    textSize(25);
    text("300", i, 490);
  }
  for(l = 580; l < 800; l = l + 80){
    textSize(25);
    text("100", l, 490);
  }

  if(particle != null){
    particle.display();
    if(particle.body.position.y > 630){
      if(particle.body.position.x < 320){
        score = score + 500;
        particle = null;
        if(turn >= 5){
          gameState = "end";
        }
      }
    }
  }
  if(particle != null){
    particle.display();
    if(particle.body.position.y > 630){
      if(particle.body.position.x < 560 && particle.body.position.x > 320){
        score = score + 300;
        particle = null;
        if(turn >= 5){
          gameState = "end";
        }
      }
    }
  }
  if(particle != null){
    particle.display();
    if(particle.body.position.y > 630){
      if(particle.body.position.x < 800 && particle.body.position.x > 560){
        score = score + 100;
        particle = null;
        if(turn >= 5){
          gameState = "end";
        }
      }
    }
  }
  
  drawSprites();

  fill("turquoise");
  textSize(25);
  text(" Score: "+ score , 20, 40);

  stroke("yellow");
  strokeWeight(5);
  line(0,450,800,450);
}

function mousePressed(){
  if(gameState !== "end"){
    turn = turn + 1;
    particle = new Particle(mouseX, 5, 7);
  }
}