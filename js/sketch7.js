var apiKey = "2e47b84bea35acf3040b94f081181471";
var city;
var temp;
var weatherData;
var loc;
var icon;
var humidity;
var wind;
var direction;

// ***** Setup function ***** //
function setup(){
    createCanvas(800, 800);
    button = select('#submit');
    city = select('#city');
    windHtml = select('#wind');
    directionHtml = select('#direction');
    humidityHtml = select('#humidity');
    locHtml = select('#location');
    tempHtml = select('#temp');
    button.mousePressed(updateByCity);
}

function updateByCity() {
    var cityValue = city.value();
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "q=" + cityValue + "&apiKey=" + apiKey;
    loadJSON(url, sendRequest);
    // sendRequest (url);
}

function updateByGeo(lat, lon) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat + 
        "&lon=" + lon +
        "&apiKey=" + apiKey;
    sendRequest(url); 
}

function sendRequest(apiResponse) {
    weatherData = apiResponse;
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function() {
    print(weatherData);
    if (weatherData){
        icon = weatherData.weather[0].id;
        humidity = weatherData.main.humidity;
        wind = weatherData.wind.speed;
        direction = degreesToDirection(weatherData.wind.deg);
        loc = weatherData.name;
        temp = K2C(weatherData.main.temp);
        update();
    }
     //    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     //        var data = JSON.parse(xmlhttp.responseText);
     //        var weather = {};
     //        weather.icon = data.weather[0].id;
     //        weather.humidity = data.main.humidity;
     //        weather.wind = data.wind.speed;
     //        weather.direction = degreesToDirection(data.wind.deg);
     //        weather.loc = data.name;
     //        weather.temp = K2C(data.main.temp);
     //        update(weather);
     //    }
     // };
     // xmlhttp.open("GET", url, true);
     // xmlhttp.send();
}


function degreesToDirection(degrees) {
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = [ "N", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
        if( degrees >= low && degrees < high ){
            return angles[i];
        }
        else {

        }

        low = (low + range) % 360;
        high = (high + range) % 360;
    }
    return "N";
}

function K2C(k) {
    return Math.round(k - 273.15);
}

function K2F(k) {
    return Math.round(k*(9/5)-459.67);
}

function update() {
    windHtml.html(wind);
    directionHtml.html(direction);
    humidityHtml.html(humidity);
    locHtml.html(location);
    tempHtml.html(temp);
    icon.src = "../img/codes/" + icon + ".png";
    // wind.innerHTML = wind;
    // direction.innerHTML = direction;
    // humidity.innerHTML = humidity;
    // loc.innerHTML = loc;
    // temp.innerHTML = temp;
    
}

function showPosition(position) {
    updateByGeo(position.coords.latitude, position.coords.longitude);
}

// // ***** Draw function ***** //
function draw(){
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");
    
//     if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         updateByCity(sendRequest);
//     }
}

