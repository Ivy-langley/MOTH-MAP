let borough = 'Camberwell';
let url = "http://api.airvisual.com/v2/city?city=" + borough + "&state=England&country=United%20Kingdom&key=d93890ba-8e3c-412b-a241-92684d3018fa";
let AQI;

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

let animatedCircles = []; // Array to hold animated circle objects

function preload() {
  console.log("preload");
  getAQI();
}

function setup() {
  createCanvas(3150, 1600); // Ensure canvas is large enough for your points
  background(255); // Set the background to white
  frameRate(30); // 30 FPS for smooth animation
  setInterval(getAQI, 50000); // Fetch AQI periodically

  // Initialize animated circles
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    animatedCircles.push(new AnimatedCircle(p.x, p.y, p.r));
  }
}

function draw() {
  background(255,255,255,50); // Clear the canvas each frame

  // Draw and animate each circle
  for (let circle of animatedCircles) {
    circle.update();
    circle.draw();
  }
}

// AnimatedCircle class with arc aesthetics
class AnimatedCircle {
  constructor(x, y, baseRadius) {
    this.x = x; // Center x
    this.y = y; // Center y
    this.baseRadius = baseRadius; // Base radius
    this.offset = 0; // For animation (oscillation)
  }

  update() {
    this.offset += 0.1; // Increment offset for smooth animation

  }

  draw() {
    let oscillatingRadius = this.baseRadius + sin(this.offset) * 10; // Oscillate radius
    let arcCount = 5; // Number of arcs per circle
    let arcVariant = 20; // Variability in radius size
    let positionVariant = 5; // Jitter in position

    stroke(0); // Black stroke
    strokeWeight(0.5); // Thin stroke
    noFill();

    // Draw multiple arcs with jittered positions and sizes
    for (let i = 0; i < arcCount; i++) {
      let jitteredX = this.x + random(-positionVariant, positionVariant);
      let jitteredY = this.y + random(-positionVariant, positionVariant);
      let jitteredRadius = oscillatingRadius + random(-arcVariant, arcVariant);

      arc(
        jitteredX,
        jitteredY,
        jitteredRadius * 2,
        jitteredRadius * 2,
        0,
        TWO_PI
      ); // Full circle arc
    }
  }
}

function getAQI() {
  loadJSON(url, gotData);
  console.log("Fetching AQI...");
}

function gotData(data) {
  console.log(data);
  AQI = data.data.current.pollution.aqius;
  console.log(AQI);
}
