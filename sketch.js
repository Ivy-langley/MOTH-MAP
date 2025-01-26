let borough = 'Camberwell'
let url = "http://api.airvisual.com/v2/city?city=" + borough + "&state=England&country=United%20Kingdom&key=d93890ba-8e3c-412b-a241-92684d3018fa"
let AQI;

function preload(){
	console.log("preload");
	getAQI();
  }

function setup() {
	createCanvas(3100, 1600);

	setInterval(getAQI, 50000);
  }
  
  function draw() {
	background(220);
	fill('black');

	ellipse(1473,772,71,71);//Barnsbury
	ellipse(1274,911,44,44);//Bayswater
	ellipse(1649,838,58,58);//Bethnal Green
	ellipse(1854,1400,58,58);//Bromley
	ellipse(1544,1085,60,60);//Camberwell
	ellipse(1395,784,71,71);//Camden Town
	ellipse(1743,940,55,55);//Canary Wharf
	ellipse(1751,1224,62,62);//Catford
	ellipse(2186,627,65,65);//Chadwell Heath
	ellipse(1319,1026,55,55);//Chelsea
	ellipse(1542,890,58,58);//City of London
	ellipse(1265,1233,69,69);//Earlsfield
	ellipse(1973,813,42,42);//East Ham
	ellipse(1009,430,58,58);//Edgware
	ellipse(2318,1046,47,47);//Erith
	ellipse(610,1206,39,39);//Feltham
	ellipse(807,836,54,54);//Greenford
	ellipse(1158,1001,57,57);//Hammersmith
	ellipse(1521,602,53,53);//Harringay
	ellipse(584,910,53,53);//Hayes
	ellipse(1150,575,62,62);//Hendon
	ellipse(1487,711,58,58);//Holloway
	ellipse(2025,690,58,58);//Ilford
	ellipse(822,1080,58,58);//Isleworth
	ellipse(1511,786,83,83);//Islington
	ellipse(1249,967,47,47);//Kensington
	ellipse(1480,1010,58,58);//Lambeth
	ellipse(1439,930,53,53);//London
	ellipse(1233,1440,62,62);//Morden
	ellipse(1458,1380,55,55);//Norbury
	ellipse(738,739,31,31);//Northolt
	ellipse(580,445,52,52);//Northwood
	ellipse(1615,1090,65,65);//Peckham
	ellipse(1754,922,59,59);//Poplar
	ellipse(2347,609,55,55);//Romford
	ellipse(576,620,46,46);//Ruislip
	ellipse(2112,1307,60,60);//Sidcup
	ellipse(710,907,54,54);//Southall
	ellipse(2544,689,64,64);//Upminster
	ellipse(1718,552,55,55);//Walthamstow
	ellipse(436,930,52,52);//West Drayton
	ellipse(1909,460,33,33);//Woodford Green
  }

  function getAQI(){
	loadJSON(url, gotData);
	console.log("function ran");
  
  }

function gotData(data){
  console.log(data);

  AQI = data.current;
  console.log(AQI);
}