const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var rope2;

var bg_img;
var food;
var rabbit;

var button,blower,button2;
var bunny;
var blink,eat,sad;
var mutebtn;
var slab;
var bubbleImg,bubble;


var backsound,eatsound,cutsound,sadsound,airsound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bubbleImg = loadImage("bubble.png");


  backsound = loadSound("sound1.mp3");
  cutsound = loadSound("rope_cut.mp3");
  eatsound = loadSound("eating_sound.mp3");
  sadsound = loadSound("sad.wav");
  airsound = loadSound("air.wav");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,700);
  backsound.play();
  backsound.setVolume(0.5);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(210,320);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  bubble = createSprite(290,460,20,200);
  bubble.addImage(bubbleImg);
  bubble.scale = 0.1;


  slab = new Ground(300,170,100,10);
  

  
  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  // blower = createImg("balloon.png");
  // blower.position(10,250);
  // blower.size(150,100);
  // blower.mouseClicked(airBlow);

  mutebtn = createImg("mute.png");
  mutebtn.position(440,20);
  mutebtn.size(40,40);
  mutebtn.mouseClicked(mute);


  bunny = createSprite(270,100,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  var fruit_options={
    restitution:0.8
  }
  
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  Engine.update(engine);
  image(bg_img,width/2,height/2,490,690);
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  rope.show();
  rope2.show();
  slab.show();
  //console.log(fruit.x);
  
  ground.show();

  if(collide(fruit,bubble,40)==true){
    
    engine.world.gravity.y = -1;
    bubble.position.x=fruit.position.x;
    bubble.position.y=fruit.position.y;

  }

   
  
  if(collide(fruit,bunny,80)==true)
  {
  
    bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eatsound.play();
  }

  if(collide2(fruit,bunny,80)==true){
    
   
    bunny.changeAnimation('crying');
    sadsound.play();
  }

  
   
  

    drawSprites();
   }

function drop()
{
  cutsound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cutsound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null; 
}




 function collide(body,sprite,x)
 {
   if(body!=null)
         {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}



// function airBlow(){
//   Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
//   airsound.play();

//  }

function mute(){
  if(backsound.isPlaying()){
    backsound.stop();
  }else{
    backsound.play();
  }
}


function collide2(body,sprite,x)
{
  if(body!=null)
        {
        var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
         if(d>=x)
           {
              return true; 
           }
           else{
             return false;
           }
        }
}