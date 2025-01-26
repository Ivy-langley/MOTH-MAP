const pointsData = [
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

const antColor = new Uint8Array([0, 0, 0]);
const antsNum = 2750;
const sensorOffset = 20;
const clockwise = 30;
const counter = -30;

function setup() {
  createCanvas(3100, 1600); 
  angleMode(DEGREES);
  pixelDensity(1);
  background(255); // Initialize trail
  ants.init();
  console.log("Ants initialized.");
}

function draw() {
  background(255, 5); // Update trail with fading effect

  stroke(255);
  strokeWeight(30);
  mouseIsPressed && line(pmouseX, pmouseY, mouseX, mouseY);

  loadPixels(); // Load pixel data before modifying

  // Debug log to check the number of ants
  console.log(`Number of ants: ${ants.ants.length}`);
  
  // Update ants' angles and positions
  for (let i = 2; i--; ) {
    ants.updateAngle();
    ants.updatePosition();
  }

  updatePixels(); // Update pixel data on canvas

  // Draw the ellipses as black circles without borders
  noStroke();
  fill('black');
  for (const points of pointsData) {
    ellipse(points.x, points.y, points.r * 2, points.r * 2); // Multiply by 2 for diameter
  }
}

const ant = () => {
  // Initialize ants at the edges of the canvas
  const edge = floor(random(4)); // Randomly choose top, bottom, left, or right edge

  let x, y, angle;

  // Set initial position and angle based on the selected edge
  if (edge === 0) { // Top edge
    x = random(width);
    y = 0;
    angle = atan2(height / 2 - y, width / 2 - x);
  } else if (edge === 1) { // Bottom edge
    x = random(width);
    y = height;
    angle = atan2(height / 2 - y, width / 2 - x);
  } else if (edge === 2) { // Left edge
    x = 0;
    y = random(height);
    angle = atan2(height / 2 - y, width / 2 - x);
  } else { // Right edge
    x = width;
    y = random(height);
    angle = atan2(height / 2 - y, width / 2 - x);
  }

  return { x, y, angle, step: random(2, 3) }; // Ant moves towards center
};

const ants = {
  ants: [],

  init() {
    this.ants.length = 0;
    for (let i = antsNum; i--; ) {
      this.ants.push(ant()); // Add ants to the array
    }
    console.log("Ants initialized.");
  },

  smell(a, d) {
    const aim = a.angle + d;
    let x = 0 | (a.x + sensorOffset * cos(aim));
    let y = 0 | (a.y + sensorOffset * sin(aim));
    x = (x + width) % width;
    y = (y + height) % height;

    const index = (x + y * width) * 4;
    return pixels[index]; // Get pixel data for the red channel
  },

  updateAngle() {
    for (const a of this.ants) {
      let attraction = createVector(0, 0);

      // Attract the ant towards the ellipses
      for (const ellipse of pointsData) {
        const d = dist(a.x, a.y, ellipse.x, ellipse.y); // Distance to ellipse center
        if (d < ellipse.r) {
          const force = createVector(ellipse.x - a.x, ellipse.y - a.y);
          force.setMag(0.1 / d); // Apply force inversely proportional to the distance
          attraction.add(force);
        }
      }

      // Adjust angle based on the attraction vector
      a.angle += attraction.heading();
    }
  },

  updatePosition() {
    for (const a of this.ants) {
      // Move ant based on its angle and step size
      a.x += cos(a.angle) * a.step;
      a.y += sin(a.angle) * a.step;

      // Wrap around the edges of the canvas
      a.x = (a.x + width) % width;
      a.y = (a.y + height) % height;

      // Set the ant's trail color at the new position
      const index = ((0 | a.x) + (0 | a.y) * width) * 4;
      pixels.set(antColor, index);
    }
  },
};


