// The brush strokes will gradually fade away.

let brushColor; // A variable to hold the color of our brush

function setup() {
  // Create a canvas that fills the entire window
  createCanvas(700, 700);
  // Set the initial background color to black
  background(0);
  // Set the initial brush color to white
  brushColor = 255; 
}

function draw() {
  // core of the animation
  // drawing semi-transparent black (0,0,0,5)
  // fourth value (5) is the alpha (transparancy) channel.
  // higher value would make a fade faster
  fill(0,5)
  noStroke(0);
  rect(0, 0, width, height)
}

// Drag mouse for draw
function mouseDragged(){
  stroke(brushColor);
  let brushSize = 60;
  strokeWeight(brushSize);
  // line cap round for a softer brush 
  strokeCap(ROUND)
  //pervious mouse position to the current mouse position 
  line(pmouseX, pmouseY, mouseX, mouseY)
}

function keyPressed(){
  //clear the canvas with the 'c' key
  if (key === 'c' || key === 'C'){
    background(0);
  }
}




