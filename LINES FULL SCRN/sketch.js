let points = [
  { x: 1473, y: 772, r: 71 }, // Barnsbury
  { x: 1274, y: 911, r: 44 }, // Bayswater
  { x: 1649, y: 838, r: 58 }, // Bethnal Green
  { x: 1854, y: 1400, r: 58 }, // Bromley
  { x: 1544, y: 1085, r: 60 }, // Camberwell
  { x: 1395, y: 784, r: 71 }, // Camden Town
  { x: 1743, y: 940, r: 55 }, // Canary Wharf
  { x: 1751, y: 1224, r: 62 }, // Catford
  { x: 2186, y: 627, r: 65 }, // Chadwell Heath
  { x: 1319, y: 1026, r: 55 }, // Chelsea
  { x: 1542, y: 890, r: 58 }, // City of London
  { x: 1265, y: 1233, r: 69 }, // Earlsfield
  { x: 1973, y: 813, r: 42 }, // East Ham
  { x: 1009, y: 430, r: 58 }, // Edgware
  { x: 2318, y: 1046, r: 47 }, // Erith
  { x: 610, y: 1206, r: 39 }, // Feltham
  { x: 807, y: 836, r: 54 }, // Greenford
  { x: 1158, y: 1001, r: 57 }, // Hammersmith
  { x: 1521, y: 602, r: 53 }, // Harringay
  { x: 584, y: 910, r: 53 }, // Hayes
  { x: 1150, y: 575, r: 62 }, // Hendon
  { x: 1487, y: 711, r: 58 }, // Holloway
  { x: 2025, y: 690, r: 58 }, // Ilford
  { x: 822, y: 1080, r: 58 }, // Isleworth
  { x: 1511, y: 786, r: 83 }, // Islington
  { x: 1249, y: 967, r: 47 }, // Kensington
  { x: 1480, y: 1010, r: 58 }, // Lambeth
  { x: 1439, y: 930, r: 53 }, // London
  { x: 1233, y: 1440, r: 62 }, // Morden
  { x: 1458, y: 1380, r: 55 }, // Norbury
  { x: 738, y: 739, r: 31 }, // Northolt
  { x: 580, y: 445, r: 52 }, // Northwood
  { x: 1615, y: 1090, r: 65 }, // Peckham
  { x: 1754, y: 922, r: 59 }, // Poplar
  { x: 2347, y: 609, r: 55 }, // Romford
  { x: 576, y: 620, r: 46 }, // Ruislip
  { x: 2112, y: 1307, r: 60 }, // Sidcup
  { x: 710, y: 907, r: 54 }, // Southall
  { x: 2544, y: 689, r: 64 }, // Upminster
  { x: 1718, y: 552, r: 55 }, // Walthamstow
  { x: 436, y: 930, r: 52 }, // West Drayton
  { x: 1909, y: 460, r: 33 }  // Woodford Green
];

function setup() {
  createCanvas(3100, 2000); // Set the canvas size
  noStroke();
}

function draw() {
  background(255); // Clear the canvas each frame

  let time = millis() * 0.001; // Use time to vary the noise

  // First, draw the main rectangles with a fixed width and height based on r
  for (let i = 0; i < points.length; i++) {
    const { x, y, r } = points[i]; // Extract x, y, r values
    const h = r * 1.5; // Height based on r

    // Map r to greyscale value
    let colorValue = map(r, 0, 125, 255, 0); // Larger r = darker color
    fill(colorValue);

    // Draw the main vertical rectangle
    rect(x - 25, y, 50, h); // Main rectangle with width 4 and height based on r
  }

  // Now, add jittering expanding lines
  for (let i = 0; i < points.length; i++) {
    const { x, y, r } = points[i]; // Extract x, y, r values
    const h = r * 1.5; // Height based on r
    const jitter = noise(time + i) * 20 - 10; // Jitter for additional lines

    // Map r to greyscale value for lines
    let colorValue = map(r, 0, 125, 255, 0); // Larger r = darker color
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




