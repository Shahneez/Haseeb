// ***** Global variables ***** //
var citibikeData;


// ***** Preload function ***** //
function preload(){
	citibikeData = loadJSON('../data/citibike.json')
	console.log('The json  file has been loaded...')
}

// ***** Setup function ***** //
function setup(){
	createCanvas(800, 800);
	console.log(citibikeData.data.stations[0].num_bikes_available);
}


// ***** Draw function ***** //
function Draw(){

}