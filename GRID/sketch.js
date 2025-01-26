let borough = 'Camberwell';
let url = "http://api.airvisual.com/v2/city?city=" + borough + "&state=England&country=United%20Kingdom&key=d93890ba-8e3c-412b-a241-92684d3018fa";
let AQI;
let gridSize = 10; 
let cols, rows; 

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

let noiseOffset = 0;

function preload() {
  console.log("preload");
  getAQI();
}

function setup() {
  createCanvas(3100, 1600);
  cols = floor(width / gridSize);
  rows = floor(height / gridSize);
  setInterval(getAQI, 50000);
  noLoop();

}

  function draw() {
    // Draw grid
  stroke(0);
  for (let i = 0; i <= cols; i++) {
    line(i * gridSize, 0, i * gridSize, height);
  }
  for (let j = 0; j <= rows; j++) {
    line(0, j * gridSize, width, j * gridSize);
  }
    noiseOffset += 0.01; // Increment noise offset for smooth animation
  
    for (let i = 0; i < points.length; i++) {
      let x1 = points[i].x;
      let y1 = points[i].y;
      let r1 = points[i].r;
  
      for (let j = i + 1; j < points.length; j++) {
        let x2 = points[j].x;
        let y2 = points[j].y;
        let r2 = points[j].r;
      }
  
      let colorValue = map(r1, 0, 150, 255, 0);
      fill(colorValue);
      noStroke();
      rectMode(CORNER);
      rect(x1, y1, r1, r1);
  }
}


function getAQI() {
  loadJSON(url, gotData);
  console.log("function ran");
}

function gotData(data) {
  console.log(data);
  AQI = data.current;
  console.log(AQI);
}