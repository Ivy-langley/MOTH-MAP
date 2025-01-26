let points = [
  { x: 1473, y: 772, r: 71, borough: "Barnsbury" },
  { x: 1274, y: 911, r: 44, borough: "Bayswater" },
  { x: 1649, y: 838, r: 58, borough: "Bethnal Green" },
  { x: 1854, y: 1400, r: 58, borough: "Bromley" },
  { x: 1544, y: 1085, r: 60, borough: "Camberwell" },
  { x: 1395, y: 784, r: 71, borough: "Camden Town" },
  { x: 1743, y: 940, r: 55, borough: "Canary Wharf" },
  { x: 1751, y: 1224, r: 62, borough: "Catford" },
  { x: 2186, y: 627, r: 65, borough: "Chadwell Heath" },
  { x: 1319, y: 1026, r: 55, borough: "Chelsea" },
  { x: 1542, y: 890, r: 58, borough: "City of London" },
  { x: 1265, y: 1233, r: 69, borough: "Earlsfield" },
  { x: 1973, y: 813, r: 42, borough: "East Ham" },
  { x: 1009, y: 430, r: 58, borough: "Edgware" },
  { x: 2318, y: 1046, r: 47, borough: "Erith" },
  { x: 610, y: 1206, r: 39, borough: "Feltham" },
  { x: 807, y: 836, r: 54, borough: "Greenford" },
  { x: 1158, y: 1001, r: 57, borough: "Hammersmith" },
  { x: 1521, y: 602, r: 53, borough: "Harringay" },
  { x: 584, y: 910, r: 53, borough: "Hayes" },
  { x: 1150, y: 575, r: 62, borough: "Hendon" },
  { x: 1487, y: 711, r: 58, borough: "Holloway" },
  { x: 2025, y: 690, r: 58, borough: "Ilford" },
  { x: 822, y: 1080, r: 58, borough: "Isleworth" },
  { x: 1511, y: 786, r: 83, borough: "Islington" },
  { x: 1249, y: 967, r: 47, borough: "Kensington" },
  { x: 1480, y: 1010, r: 58, borough: "Lambeth" },
  { x: 1439, y: 930, r: 53, borough: "London" },
  { x: 1233, y: 1440, r: 62, borough: "Morden" },
  { x: 1458, y: 1380, r: 55, borough: "Norbury" },
  { x: 738, y: 739, r: 31, borough: "Northolt" },
  { x: 580, y: 445, r: 52, borough: "Northwood" },
  { x: 1615, y: 1090, r: 65, borough: "Peckham" },
  { x: 1754, y: 922, r: 59, borough: "Poplar" },
  { x: 2347, y: 609, r: 55, borough: "Romford" },
  { x: 576, y: 620, r: 46, borough: "Ruislip" },
  { x: 2112, y: 1307, r: 60, borough: "Sidcup" },
  { x: 710, y: 907, r: 54, borough: "Southall" },
  { x: 2544, y: 689, r: 64, borough: "Upminster" },
  { x: 1718, y: 552, r: 55, borough: "Walthamstow" },
  { x: 436, y: 930, r: 52, borough: "West Drayton" },
  { x: 1909, y: 460, r: 33, borough: "Woodford Green" }
];

let apiKey = "d93890ba-8e3c-412b-a241-92684d3018fa";
let baseUrl = "http://api.airvisual.com/v2/city";
let fetchInterval = 50000; // Fetch every 50 seconds
let batchSize = 1; // Number of requests per batch
let delayTime = 10000; // Delay between batches (in ms)

function setup() {
  createCanvas(3100, 2000);
  noStroke();
  fetchAQIData();
  setInterval(fetchAQIData, fetchInterval);
}

function draw() {
  background(255); // Clear the canvas each frame

  let time = millis() * 0.001; // Use time to vary the noise

  // Draw the main rectangles and jittering lines
  for (let i = 0; i < points.length; i++) {
    const { x, y, r } = points[i];
    const h = r * 1.5; // Height based on r
    let colorValue = map(r, 0, 250, 255, 0); // Map r to greyscale value
    fill(colorValue);
    rect(x - 25, y, 50, h); // Draw main rectangle

    // Jittering expanding lines
    const jitter = noise(time + i) * 20 - 10;
    let d = h * 0.25;
    const df = 1.15;
    for (let j = 0; j < 50; j++) {
      const isInLeft = x - d > 0;
      const isInRight = x + d < width;
      if (isInLeft) rect(x - d + jitter, y, 2, h);
      if (isInRight) rect(x + d + jitter, y, 2, h);
      if (!(isInLeft || isInRight)) break;
      d *= df;
    }
  }
}

// Function to fetch AQI data in batches
async function fetchAQIData() {
  let requests = [];

  // Create an array of promises to fetch AQI data
  for (let i = 0; i < points.length; i++) {
    let borough = points[i].borough;
    let url = `${baseUrl}?city=${borough}&state=England&country=United%20Kingdom&key=${apiKey}`;
    requests.push(fetch(url).then(response => response.json()).then(data => updateAQI(data, borough)));
  }

  // Process requests in batches with a delay between each batch
  for (let i = 0; i < requests.length; i += batchSize) {
    let batch = requests.slice(i, i + batchSize);
    // Wait for all promises in the batch to resolve
    await Promise.all(batch);
    // Wait for the delay before the next batch
    if (i + batchSize < requests.length) {
      await new Promise(resolve => setTimeout(resolve, delayTime));
    }
  }
  console.log('All AQI data fetched successfully');
}

// Update the r value for a specific point based on API data
function updateAQI(data, borough) {
  if (data && data.data && data.data.current && data.data.current.pollution) {
    let aqi = data.data.current.pollution.aqius; // AQI value in US standard
    let point = points.find(p => p.borough === borough);
    if (point) {
      point.r = map(aqi, 0, 300, 30, 150); // Map AQI to r range
    }
  }
}


