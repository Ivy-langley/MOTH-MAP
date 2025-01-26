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

let noiseScale = 0.1; // Controls noise detail
let timeOffset = 0;  // Used for animation

function setup() {
  createCanvas(3100, 1600);
  frameRate(9); // Smooth animation
}

function draw() {
  background(255);

  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    let r = points[i].r;

    drawBlotch(x, y, r, i, timeOffset); // Pass timeOffset for animation
  }

  timeOffset += 0.01; 
}

// Function to draw a tapered, animated Rorschach-like blotch
function drawBlotch(cx, cy, r, seedOffset, t) {
  let width = r*2; // Maximum width of the shape
  let height = r*4; // Height of the shape
  let points = 25; // Number of points per side

  // Map r to a greyscale value for the fill
  let colorValue = map(r, 0, 125, 255, 0); // Larger r = darker color
  fill(colorValue,200);
  noStroke();

  beginShape();

  // Left side of the blotch
  for (let i = 0; i < points; i++) {
    let y = map(i, 0, points - 1, -height / 2, height / 2); // Vertical position
    let taper = map(abs(y), 0, height / 4, 4, 2); // Taper factor (1 at center, 0 at edges)
    let xOff = i * noiseScale + seedOffset; // Add seedOffset for unique noise
    let x = (noise(xOff, t) - 0.5) * width * taper; // Add time-based noise
    vertex(cx - x, cy + y);
  }

  // Right side (mirrored)
  for (let i = points - 1; i >= 0; i--) {
    let y = map(i, 0, points - 1, -height / 2, height / 2); // Vertical position
    let taper = map(abs(y), 0, height / 4, 4, 2); // Taper factor (1 at center, 0 at edges)
    let xOff = i * noiseScale + seedOffset; // Add seedOffset for unique noise
    let x = (noise(xOff, t) - 0.5) * width * taper; // Add time-based noise
    vertex(cx + x, cy + y);
  }

  endShape(CLOSE);
}
