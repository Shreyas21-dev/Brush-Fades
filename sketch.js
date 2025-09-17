// A variable to hold the current hue value for our rainbow brush.
let hueValue = 1;

// A variable to control the speed of the fading effect.
// A higher number means the trails will disappear faster.
let fadeSpeed = 8;

// A boolean flag to turn the fading effect on or off.
let isFading = true;

/**
 * The setup() function runs once when the program starts.
 * It's used to define initial environment properties.
 */
function setup() {
  // Create a canvas that is 700x700 pixels.
  createCanvas(700, 700);
  
  // Set the color mode to HSB (Hue, Saturation, Brightness).
  // This makes it much easier to create a rainbow effect by cycling through the hue.
  // - Hue range: 0 to 360 (representing the color wheel)
  // - Saturation range: 0 to 100
  // - Brightness range: 0 to 100
  colorMode(HSB, 360, 100, 100);
  
  // Set the initial background color to black.
  // In HSB mode, black has a brightness of 0.
  background(0);
}

/**
 * The draw() function runs continuously in a loop after setup() is finished.
 * It's the core of the animation.
 */
function draw() {
  // Only apply the fading effect if our 'isFading' flag is true.
  if (isFading) {
    // We create the fading effect by drawing a semi-transparent black rectangle
    // over the entire canvas on every frame.
    
    // Set the fill color to black (hue 0, saturation 0, brightness 0)
    // with a low alpha (transparency) value. The 'fadeSpeed' variable
    // controls this transparency.
    fill(0, 0, 0, fadeSpeed / 100); // Normalize fadeSpeed to a 0-1 alpha range
    noStroke(); // We don't want an outline on our fading rectangle.
    
    // Draw the rectangle covering the whole canvas.
    rect(0, 0, width, height);
  }
}

/**
 * The mouseDragged() function is called every time the mouse is moved
 * while the mouse button is held down.
 */
function mouseDragged() {
  // --- Dynamic Brush Size ---
  // Calculate the speed of the mouse by finding the distance between its
  // current position (mouseX, mouseY) and its previous position (pmouseX, pmouseY).
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  
  // Map the calculated speed to a desired brush size range.
  // A speed of 0 will correspond to a brush size of 5.
  // A speed of 25 will correspond to a brush size of 80.
  let brushSize = map(speed, 0, 25, 5, 80);
  
  // --- Dynamic Rainbow Color ---
  // Set the stroke color using our continuously changing 'hueValue'.
  // Saturation and brightness are kept high for vibrant colors.
  stroke(hueValue, 90, 100);
  
  // Increment the hue value for the next frame.
  hueValue++;
  
  // If the hue value exceeds 360 (the end of the color wheel),
  // reset it back to 0 to cycle through the rainbow again.
  if (hueValue > 360) {
    hueValue = 0;
  }

  // Set the brush thickness and style.
  strokeWeight(brushSize);
  strokeCap(ROUND); // Creates soft, rounded ends on the lines.
  
  // Draw a line from the mouse's previous location to its current location.
  line(pmouseX, pmouseY, mouseX, mouseY);
}

/**
 * The keyPressed() function is called once every time a key is pressed.
 */
function keyPressed() {
  // Use a switch statement to handle different key presses.
  switch (key.toLowerCase()) {
    case 'c':
      // If 'c' is pressed, clear the canvas by drawing a black background.
      background(0);
      break;
    case 's':
      // If 's' is pressed, save the current canvas as a PNG image.
      saveCanvas('myRainbowDrawing', 'png');
      break;
    case 'f':
      // If 'f' is pressed, toggle the fading effect on or off.
      // 'isFading = !isFading' flips the boolean value.
      isFading = !isFading;
      break;
  }
  
  // Use keyCode for non-character keys like the arrow keys.
  switch (keyCode) {
    case UP_ARROW:
      // If the UP arrow is pressed, increase the fade speed.
      // We use min() to cap the value at 50, so it doesn't get too fast.
      fadeSpeed = min(fadeSpeed + 2, 50);
      break;
    case DOWN_ARROW:
      // If the DOWN arrow is pressed, decrease the fade speed.
      // We use max() to ensure the value doesn't go below 0.
      fadeSpeed = max(fadeSpeed - 2, 0);
      break;
  }
}
