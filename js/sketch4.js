// ***** Global variables ***** //
var refugeeTable;
var topRefugeesTable = new p5.Table;
var maxTotal = 0;
var maxLength = 750;
var maxValue = 0;
var maxLabel = 0;
var headers = ['Country','Refugees','Asylum-seekers','Returned refugees','IDPs','Returned IDPs','Stateless','Others of concern','Total']

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
	for (var i = 0; i < headers.length; i++){
		topRefugeesTable.addColumn(headers[i]);
	}
	for (var i = 0; i < refugeeTable.getRowCount(); i++){
		var totalRefugees = refugeeTable.getNum(i, 'Total');
		if (totalRefugees >= 100000) {
			var newRow = topRefugeesTable.addRow()
			for (var j = 0; j < headers.length; j++){
				newRow.setString(headers[j], refugeeTable.getString(i, headers[j]));
			}
		}
	}
	print ('New top refugee table created...');
	print (topRefugeesTable);
}

function drawCountries(category){
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        var total = topRefugeesTable.getNum(i, category);
        var length = map(total, 0, maxTotal, 0, maxLength);
        rect(maxLabel * 5, 2 + 14*i, length, 12);
        text(nfc(total, 0), maxLabel * 5 + length + 5, 14*i);
    }
    textAlign(RIGHT, TOP);
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        text(topRefugeesTable.getString(i, 'Country'), maxLabel * 5 - 5, 14*i);
    }
}

// ***** Draw function ***** //
function draw(){
    background(255);
    // drawCountries(refugeeTable);
    drawCountries('Asylum-seekers');
}


