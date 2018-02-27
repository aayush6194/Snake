var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var scoreOne = 0;
var scoreTwo = 0;

function setup(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  clear();
}
window.onload= function(){setup();}
function clear(){
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  setup();
  f.update();
  ff.update();
  ss.update();
  s.update();
  c.font = "40px Arial";
  c.fillText("Score 1: "+ scoreOne, 100,100);
  c.fillText("Score 2: "+ scoreTwo,100, canvas.height-100);
  //button();
}

function snake( color)
{
  this.length = 40;
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.dx = 0;
  this.dy = 0;
  this.len = 1;
  this.tail = [];

  this.draw = function()
  {
    c.fillStyle= color;
    c.fillRect(this.x,this.y, this.length, this.length);
  }

  this.update = function()
  {

    this.onEdge();
  	c.clearRect(this.x,this.y, this.length, this.length);
    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  }

    this.moves= function  (x , y) {
    this.dx = x;
    this.dy = y;
  }

//  this.moveTail = function(){

  //  for(var i = 0; i < this.len-1; i++)
    //{
  //   this.tail[i] = this.tail [i+1];
  //  }
    //  this.tail.push(this.x, this.y);

    //while(this.tail.length>this.len) {

  //  this.tail.shift();
  //}

    //if(ax==px && ay==py) {
      //  tail++;
      //  ax=Math.floor(Math.random()*tc);
      //  ay=Math.floor(Math.random()*tc);
  //  }


//  }

  this.onEdge= function(){
    if(this.x < - this.length)
    {
      this.x= canvas.width;
    }
    else if (this.y<- this.length) {
      this.y = canvas.height;
    }
    else if (this.y> canvas.height + this.length) {
      this.y = 0;
    }
    else if (this.x> canvas.width + this.length) {
      this.x = 0;
    }
  }

  this.checkX = function(){
    return this.x;
  }

  this.checkY = function(){
    return this.y;
  }

  this.increaseLen = function (){
    this.len++;
  }
}

function food(color)
{
  this.radius = 20;
  this.x = Math.floor(Math.random()*(canvas.width*0.75));
  this.y = Math.floor(Math.random()*(canvas.height*0.75));
  //base_image = new Image();
 //base_image.src = 'https://png.pngtree.com/element_pic/00/16/08/0657a4e9de90e5b.jpg';
  this.draw = function(){
     //c.drawImage(base_image, this.x, this.y);
    //c.beginPath();
    // c.fill();
    //  c.arc(this.x, this.y, this.radius, 0, Math.PI );
    //  c.stroke();
    //  c.closePath();
    c.fillStyle= color;
    c.fillRect(this.x, this.y, this.radius, this.radius);
    }

    this.update = function () {
      this.onEaten();
      this.draw();
    }

    this.onEaten = function () {
      var distTwo = Math.pow(Math.pow(((this.x+10) - (ss.checkX()+20)),2) + Math.pow(((this.y+10) - (ss.checkY()+20)),2),1/2);
      var distOne = Math.pow(Math.pow(((this.x+10) - (s.checkX()+20)),2) + Math.pow(((this.y+10) - (s.checkY()+20)),2),1/2);
      if ( distOne <30)
      {
        this.x = Math.floor(Math.random()*canvas.width);
        this.y = Math.floor(Math.random()*canvas.height);
        scoreOne++;
          s.increaseLen();
      }
      else if (distTwo <30) {
        this.x = Math.floor(Math.random()*canvas.width);
        this.y = Math.floor(Math.random()*canvas.height);
        scoreTwo++;
        ss.increaseLen();
      }
    }
  }

var s= new snake ("lime");
var f = new food("yellow");
var ss = new snake( "blue");
var ff = new food("pink");
function button()
{
c.fillRect(30,30, 30,30);
}


function pressed(event)
{
  this.speed = 5;
  console.log(event.keyCode);
  if(event.keyCode==87)
  {
    s.moves(0, -this.speed);
  }

  else if(event.keyCode==83)
  {
    s.moves(0, this.speed);
  }

  else if(event.keyCode==68)
  {
    s.moves(this.speed,0);
  }
  else if(event.keyCode==65)
  {
    s.moves(-this.speed,0);
  }

  else if(event.keyCode==38)
  {
      ss.moves(0, -this.speed);
  }
  else if(event.keyCode==40)
  {
    ss.moves(0, this.speed);
  }
  else if(event.keyCode==37)
  {
    ss.moves(this.speed,0);
  }
  else if(event.keyCode==39)
  {
    ss.moves(-this.speed,0);
  }

  this.increaseSpeed = function(){
this.speed *=2;

  }
}

window.addEventListener("keydown", pressed);
window.setInterval(draw, 25);
