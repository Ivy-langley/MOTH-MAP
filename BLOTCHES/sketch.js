let points = [
  { x: 1473, y: 772, r: 71 },
  { x: 1274, y: 911, r: 44 },
  { x: 1649, y: 838, r: 58 },
  { x: 1854, y: 1400, r: 58 },
  { x: 1544, y: 1085, r: 60 },
  { x: 1395, y: 784, r: 71 },
  { x: 1743, y: 940, r: 55 },
  { x: 1751, y: 1224, r: 62 },
  { x: 2186, y: 627, r: 65 },
  { x: 1319, y: 1026, r: 55 },
  { x: 1542, y: 890, r: 58 },
  { x: 1265, y: 1233, r: 69 },
  { x: 1973, y: 813, r: 42 },
  { x: 1009, y: 430, r: 58 },
  { x: 2318, y: 1046, r: 47 },
  { x: 610, y: 1206, r: 39 },
  { x: 807, y: 836, r: 54 },
  { x: 1158, y: 1001, r: 57 },
  { x: 1521, y: 602, r: 53 },
  { x: 584, y: 910, r: 53 },
  { x: 1150, y: 575, r: 62 },
  { x: 1487, y: 711, r: 58 },
  { x: 2025, y: 690, r: 58 },
  { x: 822, y: 1080, r: 58 },
  { x: 1511, y: 786, r: 83 },
  { x: 1249, y: 967, r: 47 },
  { x: 1480, y: 1010, r: 58 },
  { x: 1439, y: 930, r: 53 },
  { x: 1233, y: 1440, r: 62 },
  { x: 1458, y: 1380, r: 55 },
  { x: 738, y: 739, r: 31 },
  { x: 580, y: 445, r: 52 },
  { x: 1615, y: 1090, r: 65 },
  { x: 1754, y: 922, r: 59 },
  { x: 2347, y: 609, r: 55 },
  { x: 576, y: 620, r: 46 },
  { x: 2112, y: 1307, r: 60 },
  { x: 710, y: 907, r: 54 },
  { x: 2544, y: 689, r: 64 },
  { x: 1718, y: 552, r: 55 },
  { x: 436, y: 930, r: 52 },
  { x: 1909, y: 460, r: 33 }
];

let time = 0;

function setup() {
  createCanvas(3100, 1600);
  frameRate(10);
  noFill();
}

function draw() {
  background(255);

  for (let i = 0; i < points.length; i++) {
    let { x, y, r } = points[i];
    drawBlotch(x, y, r);

    // Ripple effect with vertical animation
    let maxRippleDistance = r * 4;
    let baseOffset = abs(sin(time)) * maxRippleDistance;
    let d = 0;

    stroke(0); 
    noFill();

    while (d < baseOffset) {
      let rippleYOffset = sin(time + d * 0.1) * 10; // Vertical ripple movement

      if (x - d > 0)
        line(x - d, y - r + rippleYOffset, x - d, y + r + rippleYOffset);
      if (x + d < width)
        line(x + d, y - r + rippleYOffset, x + d, y + r + rippleYOffset);

      d += 15; // Increment ripple spacing
    }
  }

  time += 0.02; // Increment time for animation
}

function drawBlotch(x, y, r) {
  let detail = random(1, 10); // Noise detail variation
  let irregularity = random(0.3, 0.5); // Edge distortion
  let layers = int(random(1, 12)); // Layer count for depth

  for (let layer = 0; layer < layers; layer++) {
    let offset = layer * 8;
    let layerSize = r - offset;
    let opacity = map(layer, 0, layers, 50, 200);

    fill(0, opacity);
    beginShape();

    for (let angle = 0; angle < TWO_PI; angle += 0.3) {
      let noiseFactor = noise(cos(angle) * detail, sin(angle) * detail, layer * 0.3);
      let radius = layerSize + noiseFactor * layerSize * irregularity;
      let px = x + radius * cos(angle);
      let py = y + radius * sin(angle);
      vertex(px, py);
    }

    endShape(CLOSE);
  }
}
