//createCanvas.js

//creates canvas on screen

function createCanvas()
{
	//canvas creation
	var cvs = document.getElementById("gameScreen");
	var ctx = cvs.getContext('2d');

	//set size of canvas
	cvs.height = MAP_HEIGHT * GRID_SIZE;
	cvs.width = MAP_WIDTH * GRID_SIZE;

	ctx.fillStyle = "black";	
	ctx.fillRect(0, 0, 640, 480);

	//createGrid();

	return cvs;
}