let points = [
  { x: 202, y: 1163, r: 195 }, // A
  { x: 457, y: 1446, r: 283 }, // B
  { x: 484, y: 611, r: 543 },  // C
  { x: 703, y: 139, r: 289 },  // D
  { x: 744, y: 1515, r: 201 }, // E
  { x: 760, y: 260, r: 266 },  // F
  { x: 277, y: 692, r: 277 },  // G
  { x: 941, y: 860, r: 213 },  // H
  { x: 1085, y: 260, r: 297 }, // I
  { x: 1280, y: 313, r: 261 }, // J
  { x: 1280, y: 978, r: 285 }, // K
  { x: 1377, y: 1599, r: 258 }, // L
  { x: 1414, y: 1312, r: 189 }, // M
  { x: 1443, y: 811, r: 281 },  // N
  { x: 1480, y: 1373, r: 250 }, // O
  { x: 1511, y: 1147, r: 298 }, // P
  { x: 1596, y: 420, r: 230 },  // Q
  { x: 1596, y: 1003, r: 274 }, // R
  { x: 1596, y: 1486, r: 281 }, // S
  { x: 1835, y: 1058, r: 354 }, // T
  { x: 1917, y: 67, r: 205 },   // U
  { x: 1935, y: 640, r: 172 },  // V
  { x: 1982, y: 1310, r: 196 }, // W
  { x: 2014, y: 700, r: 263 },  // X
  { x: 2024, y: 899, r: 168 },  // Y
  { x: 2064, y: 1634, r: 168 }, // Z
  { x: 2286, y: 792, r: 168 },  // AA
  { x: 2377, y: 922, r: 168 },  // BA
  { x: 2520, y: 1451, r: 168 }, // CA
];

function setup() {
  createCanvas(3100, 2000); // Set the canvas size
  noStroke();
}

function draw() {
  // Calculate the average r value
  let avgR = calculateAverageR();

  // Map the average r value to a background color
  let bgColor = map(avgR, 0, 550, 255, 0); // Map to greyscale
  background(bgColor); // Set the background color

  let time = millis() * 0.001; // Use time to vary the noise

  // Draw the main rectangles
  for (let i = 0; i < points.length; i++) {
    const { x, y, r } = points[i];
    const h = r * 1.5;

    // Map r to greyscale value
    let colorValue = map(r, 0, 550, 150, 0); // Larger r = darker color
    fill(colorValue);

    // Draw the main vertical rectangle
    rect(x - 25, y, 50, h); // Main rectangle with width 4 and height based on r
  }

  // Draw jittering expanding lines
  for (let i = 0; i < points.length; i++) {
    const { x, y, r } = points[i];
    const h = r * 1.5;
    const jitter = noise(time + i) * 20 - 10; // Jitter for additional lines

    // Map r to greyscale value for lines
    let colorValue = map(r, 0, 550, 255, 0); // Larger r = darker color
    fill(colorValue);

    // Dynamically expand the lines outward across the canvas width
    let d = h * 0.25; // Starting distance for additional lines
    const df = 1.15; // Slightly more stable distance factor
    for (let j = 0; j < 50; j++) {
      const isInLeft = x - d > 0;
      const isInRight = x + d < width;

      if (isInLeft) rect(x - d + jitter, y, 2, h); // Add jitter to left lines
      if (isInRight) rect(x + d + jitter, y, 2, h); // Add jitter to right lines

      if (!(isInLeft || isInRight)) break; // Stop if beyond canvas
      d *= df; // Gradually expand the lines outward
    }
  }
}

// Function to calculate the average of all r values
function calculateAverageR() {
  let totalR = 0;
  for (let point of points) {
    totalR += point.r;
  }
  return totalR / points.length;
}