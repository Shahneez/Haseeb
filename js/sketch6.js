// ***** Global variables ***** //
var apiKey = '7fae36888a91548a535eb9cc616f71f6';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city;
var units = 'metric';
var weatherData;
var temperature = 0;
var humidity = 0;
var button;
var windspeed;
var rain;
var snow;
var clouds;


// ***** Setup function ***** //
function setup(){
	createCanvas(800, 800);
	button = select('#submit');
	city = select('#city');
	button.mousePressed(queryAPI);
}

function queryAPI(){
	var query = baseURL + city.value() + '&apiKey=' + apiKey +'&units=' + units;
	loadJSON(query, getWeatherData);
}

function getWeatherData(apiData){
	weatherData = apiData;
	temperature = weatherData.main.temp;
	humidity = weatherData.main.humidity;
	console.log(weatherData);
}

// ***** Draw function ***** //
function draw(){
	background(255);
	fill (0);
	noStroke();
	if (weatherData){
	ellipse(200, 200, temperature * 10, temperature * 10);
	}
}