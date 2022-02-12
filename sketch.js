
var gameState = "PLAY";

var doraemon, doraemon_running, doraemon_collided;

var doracake
var backgroundImg
var score=0;

var doracakegroup
var gameOver1, restart1;


function preload(){
  backgroundImg = loadImage("Background.jpg")
  doraemon_running = loadAnimation("Doraemon1.png","Doraemon2.png","Doraemon3.png","Doraemon4.png","Doraemon5.png","Doraemon6.png");
  doracake = loadImage("Doracake.jpg")
  mice = loadImage("Mice.png")

  game_over = loadImage("game_over.png")
  restartImg = loadImage("restart.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  doraemon = createSprite(200,height-100,20,50)
  doraemon.addAnimation("running", doraemon_running);
  doraemon.scale = 0.5;
 
  invisibleGround =  createSprite(width/2,height-100,width,125);
  invisibleGround.visible =false
  
  bg = createSprite(windowHeight,windowWidth);
  bg.addImage(backgroundImg);
  bg.x = width/2
  bg.velocityX = -(6 + 3*score/100);

  gameOver1 = createSprite(width/2,height/2- 50);
  gameOver1.addImage(game_over);
  
  restart1 = createSprite(width/2,height/2);
  restart1.addImage(restartImg);
  
  gameOver1.scale = 0.5;
  restart1.scale = 0.1;

  gameOver1.visible = false;
  restart1.visible = false;
  
  score = 0;
  doracakegroup=createGroup()
  micegroup = createGroup()
}

function draw() {

  background(backgroundImg);
 
  
  
  if (gameState==="PLAY"){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 3*score/100);
    if(doraemon.isTouching(doracakegroup)){
      score = score + 1
    }
    
    if((touches.length > 0 || keyDown("SPACE")) && doraemon.y  >= 400) {
      doraemon.velocityY = -10;
       touches = [];
    }
    
    doraemon.velocityY = doraemon.velocityY + 0.8
  
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
  
    doraemon.collide(invisibleGround);
    spawnDoracakes();
    spawnMice()
    textSize(20);
  fill("black")
  text("Score: "+ score,30,50);

  
    if(doraemon.isTouching(micegroup)){
        gameState = "END";
        gameOver1 = loadImage(game_over)
    }
  }
  else if (gameState === "END") {
    gameOver1.visible = true;
    restart1.visible = true;
    
    ground.velocityX = 0;
    doraemon.velocityY = 0;
    
    
    doracake1.setLifetimeEach(-1);
   
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
   
  }
  drawSprites();
}
  function spawnDoracakes() {
    if(frameCount % 60 === 0) {
        var doracake1 = createSprite(1000,height-200,20,30);
        doracake1.velocityX = -(6 + 3*score/100);
        doracake1.addImage(doracake);
        doracake1.scale = 0.10;
        doracake1.lifetime = 300;
        doracake1.depth = doraemon.depth;
        doraemon.depth +=1;
        doracakegroup.add(doracake1)
      
    }
  }

  function spawnMice() {
    if(frameCount % 60 === 0) {
        var mice1 = createSprite(1200,height-200,20,30);
        mice1.velocityX = -(6 + 3*score/100);
        mice1.addImage(mice);
        mice1.scale = 0.10
        mice1.lifetime = 300;
        mice1.depth = doraemon.depth;
        doraemon.depth +=1;
        micegroup.add(mice1)
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver1.visible = false;
    restart1.visible = false;
    
    doraemon.changeAnimation("running",doraemon_running);
    
    score = 0;
    
  }

  
