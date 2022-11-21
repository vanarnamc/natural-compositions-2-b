let song, amp;


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
 frameRate(10);
 background(bg);

}

function draw(){
  background(220);

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

function createTiles(){
  var i = 0;
  pg = createGraphics(tileSize, tileSize);
  pg.background(0);
  pg.noStroke();
  pg.fill(220);
  pg.ellipse(0, 0, tileSize*2, tileSize*2);
  tiles[i++] = pg;
  
  pg1 = createGraphics(tileSize, tileSize);
  pg1.background(220);
  pg1.noStroke();
  pg1.fill(0);
  pg1.ellipse(0, 0, tileSize*2, tileSize*2);
  tiles[i++] = pg1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    // background(255, 0, 0);
  } else {
    song.loop();
    // background(0, 255, 0);
  }
}