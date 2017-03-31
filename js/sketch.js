// ***** Global variables ***** //
var refugeeTable;
var maxLength = 750;
var maxValue = 0;

function preload(){
	refugeeTable = loadTable('../data/RefugeesUNHCR.csv', 'csv', 'header');
}


// ***** Setup function ***** //
function setup (){
	createCanvas(2000,4000);
	textAlign(RIGHT, TOP);
	print(refugeeTable.getRowCount());
	print(refugeeTable.getColumnCount());
	for (var i = 0; i < refugeeTable.getRowCount(); i++){
		maxValue = max(maxValue, refugeeTable.getNum(i, 'Total'));
	}
	print (maxValue);
}

function draw(){
  background(255);
  for (var i = 0; i < refugeeTable.getRowCount(); i++){
  	var rectLength = map(refugeeTable.getNum(i, 'Total'), 0, maxValue, 0, maxLength);
  	rect(200, 50 + 20 * i, rectLength, 15)
  	text(refugeeTable.getNum(i, 'Total'), rectLength + 250, 50 + 20 * i);
  }
  for (var i = 0; i < refugeeTable.getRowCount(); i++) {
  	text(refugeeTable.getString(i, 'Country'), 180, 50 + 20 * i);
  } 	
}