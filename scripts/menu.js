//Create a menu for the game, from which we can load files ,create custom map, etc. 

function menu()
{
	var ctx = document.getElementById("gameScreen").getContext('2d');
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 640, 640);
	ctx.fillStyle = "black";
	ctx.fillText("Welcome to Spacehunt", 10, 10);
	ctx.fillText("Press L to load map from file", 10, 40);
	ctx.fillText("Press C to create custom map and place objects" , 10, 70);
	ctx.fillText("Press any key to continue.", 10, 100);

	document.onkeydown = getInput;
}

function getInput(e)
{
	start();
}