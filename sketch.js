var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var fish,fishI;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg;
var jumpSound , checkPointSound, dieSound;


function preload(){
  trex_running = loadImage("fishrani.jpg");
  fishI=loadImage("fishrani.jpg");
//  trex_collided = loadAnimation("fishraja.jpg");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloudPOM.jpg");
  
  obstacle1 = loadImage("pombey3.jpg");
  obstacle2 = loadImage("pombey.jpg");
  obstacle3 = loadImage("pombey3.jpg");
  obstacle4 = loadImage("pombey.jpg");
  obstacle5 = loadImage("pombey3.jpg");
  obstacle6 = loadImage("pombey.jpg");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,800,20);
  
  invisibleGround.visible = true;
  invisibleGround.shapeColor="yellow";
  
  trex = createSprite(50,150,20,50);
  trex.addImage("running", trex_running);
  
  trex.scale=0.02;
  trex.visible="false";
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("rectangle",0,0,60,300);
  fish = createSprite(50,150,20,50);
  fish.addImage("op", fishI);
  fish.scale=0.05;
  score = 0;
  
}

function draw() {
 background("blue") 
  
  //displaying score
  text("Score: "+ score/*+ score+ score+ score+ score+ score+ score+ score+ score+ score+ score+ score+ score+ score+ score+ score+ score+ score*/, 10,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -(4+1*score/100);
    //scoring
    score = score + Math.round(frameCount/200);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& trex.y >= 150) {
        fish.velocityY = -12;
      jumpSound.play();
    }
    
    fish.velocityY = fish.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(fish)){
        gameState = END;
      dieSound.play();
      
    }
    if(score>0&&score%100===0){
       checkPointSound.play();
      
       }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      fish.velocityY = 0
     
      //change the trex animation
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60=== 0){
   var obstacle = createSprite(400,155,10,40);
   
   obstacle.velocityX = -(6+1*score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 250;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.visible=false;
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}
function reset(){
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
   gameState=PLAY;
   score = 0;
}
