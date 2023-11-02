var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var zombieGroup
var balas = 70;
var gameState = "fight";

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.4
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

zombieGroup = new Group();
balaGroup = new Group();
}

function draw() {
  background(0); 

  if(gameState === "fight"){


  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
  bala = createSprite(displayWidth-1150,player.y-30,20,10);
  bala.velocityX = 25

  balaGroup.add(bala);
  player.depth = bala.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  balas = balas-1;
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//vá para gameState "bullet" quando o jogador ficar sem balas
if(balas==0){
  gameState = "bala"
    
}

//destrua um zumbi quando a bala atingir
if(zombieGroup.isTouching(balaGroup)){

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(balaGroup)){
        zombieGroup[i].destroy()
        balaGroup.destroyEach()
        } 
  
  }
 }
//destrua o zumbi quando o jogador tocar
if(zombieGroup.isTouching(player)){

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        } 
  
  }
 }

zumbie();
  }
drawSprites();
textSize(20)
text("Balas = " + balas,displayWidth-210,displayHeight/2-250)

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("Você Perdeu",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("Você Venceu",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destrua o zumbi, o jogador e as balas e exiba uma mensagem no gameState "bullet"
else if(gameState == "bala"){
 
  textSize(50)
  fill("yellow")
  text("Você não tem mais balas!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  balaGroup.destroyEach();

}
}
//criando função para gerar zumbis
function zumbie(){
  if(frameCount%50===0){

    //dando posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(900,2100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
  //  zombie.debug= true
  //  zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
}