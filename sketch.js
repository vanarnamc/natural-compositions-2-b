let song, amp;
let ready= false;

var tiles = [30];
var windowSize = 400;

let volumeAmp= 1800;
let level = 10;
var tileSize = windowSize/10;

let margin= 10; //margin for grid the smaller the number the bigger the margin

let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave (largest number)
let period = 500.0; // How many pixels before the wave repeats
let dx=2; // Value for incrementing x
let nn;
let sinSpeed= .5;
let sinLevel = 20;
let rotateSpeed=.006;



//text
let str = 'KEYON MILL FALLS PRESS TO BEGIN KEYON MILL FALLS PRESS TO BEGIN ';

let startAngle =    0;     // angle where text should start
let distanceAngle = 360;   // how far (in degrees) text will go

let radius;                // set dynamically in setup()
let font;

let sinSpeed1=.006;


function preload() {  
  song = loadSound('audio/KenyonMillFalls.mp3');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  let bg = color(238,238,238);

  wMargin= width/margin;
  hMargin=height/margin;
  amp = new p5.Amplitude();
  amp.smooth(5);

 //noLoop();
 background(bg);

 radius = min(width,height) / 3;
 textSize(radius*.15);
 textAlign(CENTER, BASELINE);

}

function draw(){
  background(112);
 
  if (ready){ //happens after mousepressed
    createTiles();
    let vol = amp.getLevel();
    imageMode(CENTER);
    translate(width/2,height/2);
    theta += sinSpeed;
    let y = theta;
    let nn=sin(y)*20;
    let sinNormal=map(nn,-sinLevel,sinLevel,0,sinLevel);//normalizing sin
    print (vol);
    y += dx;
    scale(vol*100);
    for(var i = -width/2+wMargin; i < width/2-wMargin; i+=tileSize+sinNormal){
      for(var j = -height/2+hMargin; j < height/2-hMargin; j+=tileSize+sinNormal){ var tile = floor(random(tiles.length)); //boolean bw = (random(2) >= 1);
        if (vol>.005){
          var rotation = floor(random(4));
          push();
          translate(i,j);
          translate(tileSize/2, tileSize/2);
          rotate(PI*rotation/(vol+2));
          image(tiles[tile], 0, 0);
          pop();
        }
      }
    }
  }
  else{ //TEXT DISPLAY
    translate(width/2,height/2);
    rotate(radians(millis()*rotateSpeed));
  
    stroke(0,150,255);
    textDisplay(1);
  }
}

function createTiles(){
  frameRate(10);

  var i = 0;
  pg = createGraphics(tileSize, tileSize);
  pg.background(0);
  pg.noStroke();
  pg.fill(112);
  pg.ellipse(0, 0, tileSize*2, tileSize*2);
  tiles[i++] = pg;
  
  pg1 = createGraphics(tileSize, tileSize);
  pg1.background(112);
  pg1.noStroke();
  pg1.fill(0);
  pg1.ellipse(0, 0, tileSize*2, tileSize*2);
  tiles[i++] = pg1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function textDisplay(x){
  // calculate the angle between each letter

  rotate(radians(frameCount));
  let angleBetweenLetters = radians(distanceAngle) / str.length;

  scale(sin(frameCount*sinSpeed1)*x);
  // display the text!
  push();
  //translate(width/2, height/2);        // move to circle's center
  rotate(radians(startAngle));         // rotate to where text starts
  for (let i=0; i<str.length; i++) {   // go through each letter in the text
    push();
    rotate(i * angleBetweenLetters);   // rotate to angle
    translate(0,-radius);              // and translate to edge of circle
    fill(0);
    noStroke();
    text(str[i], 0,0);                 // draw character at location
    pop();
  }
  pop();
}


function mousePressed() {
  if (!ready) {
    // initializeAudio();
    ready = true;
    song.loop();

  }
}