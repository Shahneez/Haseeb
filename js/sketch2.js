// ***** Global variables ***** //
var refugeeTable;
var topRefugeesTable = new p5.Table;
var maxTotal = 0;
var maxLength = 750;
var maxValue = 0;
var maxLabel = 0;

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
		maxTotal = max(maxTotal, refugeeTable.getNum(i, 'Total'));
		maxLabel = max(maxLabel, refugeeTable.getString(i, 'Country').length);
	}
	print ('Maximum total is ' + maxTotal);
	print ('Maximum label length is ' + maxLabel);
	print (maxValue);
	createNewTable();
}

// *****Create new table function ***** //
function createNewTable(){
	topRefugeesTable.addColumn('Country');
	topRefugeesTable.addColumn('Total');
	for (var i = 0; i < refugeeTable.getRowCount(); i++){
		var totalRefugees = refugeeTable.getNum(i, 'Total');
		if (totalRefugees >= 100000) {
			var newRow = topRefugeesTable.addRow()
			newRow.setString('Country', refugeeTable.getString(i, 'Country'));
			newRow.setNum('Total', refugeeTable.getNum(i, 'Total'));
		}
	}
	print ('New top refugee table created...');
	print (topRefugeesTable);
}

// ***** Draw function ***** //

function draw(){
  background(255);
  fill(0);
  noStroke();
  for (var i = 0; i < topRefugeesTable.getRowCount(); i++){
  	var rectLength = map(topRefugeesTable.getNum(i, 'Total'), 0, maxValue, 0, maxLength);
  	rect(250, 50 + 20 * i, rectLength, 15)
  	text(topRefugeesTable.getNum(i, 'Total'), rectLength + 300, 50 + 20 * i);
  }
  for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
  	text(topRefugeesTable.getString(i, 'Country'), 230, 50 + 20 * i);
  } 	
}
