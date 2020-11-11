//Created variables here
var dog, happyDog,dogImg,happyDogImg;
var database;
var stock,foodStock;

function preload(){

//loaded images here
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");

}

function setup() {
  createCanvas(500, 500);

// called the firebase.database here 
  database = firebase.database();

// created the dog sprite 
  dog = createSprite(250,316,37,37);
  dog.addImage("dogImage",dogImg);
  dog.scale = 0.20;

// reference of the 'Food' from the database 
  foodStock = database.ref('Food');

// on(), used to read the value
  foodStock.on("value",readStock);
}

function draw() {  
  background(46, 139, 87);

  drawSprites();

//added styles and text 
  textSize(20);
  fill("green");
  stroke("red");
  text("Note : Press UP_ARROW to feed Drago Milk",54,26);
  text("Food Remaining : " + stock,136,180)
  if(stock === 0){
    text("Food Stock is empty. Please fill the stock. \n Press Space Key to fill Food Stock",54,420);
  }

}

// created function readStock 
function readStock(data){

// called the value of the stock
  stock = data.val();

}

// created function writeStock 
function writeStock(x){

// decreased the stock value when 'x > 0'
  if(x<=0){
    x = 0;
  }else{
    x= x-1;
  }

// updating Food value
  database.ref('/').update({ Food:x });

}


// created the function keyPressed 
function keyPressed(){

// changed the image when UP_ARROW is pressed 
  if(keyCode === 38){
    if(stock>0){
      dog.addImage("dogImage",happyDogImg);  
    }
    writeStock(stock);
  }

// updated the value 'Food:30' when SPACE KEY is pressed
  if(keyCode === 32){
    if(stock === 0){
      database.ref('/').update({ Food:30 });
    }
  }

}


// created the function keyReleased
function keyReleased(){

// changed the image when UP_ARROW is released
  if(keyCode === 38){
    dog.addImage("dogImage",dogImg);
  }

}
