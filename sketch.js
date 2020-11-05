var trex, trex_running, edges;
var groundImage;
var invisibleground
var cloudImage;
var obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6;
var score = 0
var cloudgroup, obstaclegroup
var gamestate = "play"

var gameover, gameoverImage;
var restart, restartImage;
var jumpsound
var diesound
var checkPoint 


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacleImage1 = loadImage("obstacle1.png")
  obstacleImage2 = loadImage("obstacle2.png")
  obstacleImage3 = loadImage("obstacle3.png")
  obstacleImage4 = loadImage("obstacle4.png")
  obstacleImage5 = loadImage("obstacle5.png")
  obstacleImage6 = loadImage("obstacle6.png")
  gameoverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  jumpsound = loadSound("jump.mp3")
  diesound = loadSound("die.mp3")
  checkPoint = loadSound("checkPoint.mp3")

}

function setup() {
  createCanvas(600, 200);


  // creating trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  edges = createEdgeSprites();

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  //create ground
  ground = createSprite(300, 190, 600, 10)
  ground.addImage(groundImage)

  //invisibleground 
  invisibleground = createSprite(300, 195, 600, 10)
  invisibleground.visible = false
  cloudgroup = new Group();
  obstaclegroup = new Group();

  gameover = createSprite(300, 100, 10, 10)
  gameover.addImage(gameoverImage)
  restart = createSprite(300, 120, 10, 10)
  restart.addImage(restartImage)
  gameover.visible = false
  restart.visible = false
  gameover.scale = 0.5
  restart.scale = 0.5
}


function draw() {
  //set background color 
  background(180);
  text("score:  " + score, 500, 50)
  trex.setCollider("circle", 0, 0, 40)
  if (gamestate == "play") {
    score = score + 1
    if (score%100==0){
      checkPoint.play()
    }

    //to move the ground
    ground.velocityX = -5

    //reset the ground
    if (ground.x < 0) {
      ground.x = 300
    }
    //jump when space key is pressed
    if (keyDown("space")) {
      jumpsound.play()
      trex.velocityY = -10;
    }

    //gravity
    trex.velocityY = trex.velocityY + 0.5;
    spawnclouds()
    spawnobstacle()
    if (trex.isTouching(obstaclegroup)) {
      diesound.play()
      gamestate = "end"
    }
  }
  if (gamestate == "end") {
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    trex.changeAnimation("collided")
    gameover.visible = true
    restart.visible = true
    if (mousePressedOver(restart)) {
      gamestate = "play"
      reset()

    }
  }
  //stop trex from falling down
  trex.collide(invisibleground)


  drawSprites();
}

function spawnclouds() {
  if (frameCount % 60 == 0) {
    var r = Math.round(random(50, 120))
    var cloud = createSprite(600, r, 20, 10);
    cloud.velocityX = -5
    cloud.addImage(cloudImage)

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1
    cloud.lifetime = 600 / 5
    cloudgroup.add(cloud);

  }
}

function spawnobstacle() {
  if (frameCount % 80 == 0) {
    var r = Math.round(random(1, 6))
    var obstacle = createSprite(600, 170, 15, 10)
    obstacle.scale = 0.75
    obstacle.velocityX = -5


    obstaclegroup.add(obstacle)

    if (r == 1) {
      obstacle.addImage(obstacleImage1)

    }
    if (r == 2) {
      obstacle.addImage(obstacleImage2)

    }
    if (r == 3) {
      obstacle.addImage(obstacleImage3)
    }
    if (r == 4) {
      obstacle.addImage(obstacleImage4)
    }
    if (r == 5) {
      obstacle.addImage(obstacleImage5)
    }
    if (r == 6) {
      obstacle.addImage(obstacleImage6)
    }

  }
}

function reset() {
  gameover.visible = false
  restart.visible = false
  score = 0
  trex.changeAnimation("running")
  cloudgroup.destroyEach();
  obstaclegroup.destroyEach();
}