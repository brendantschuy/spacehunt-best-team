//Create a menu for the game, from which we can load files ,create custom map, etc. 

//currently disabled. to enable, change "onload" in index.html to call menu()
function menu()
{
	var ctx = document.getElementById("gameScreen").getContext('2d');
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 640, 640);
	ctx.fillStyle = "black";
	ctx.fillText("Welcome to Spacehunt", 10, 10);
	ctx.fillText("Press L to load map from file", 10, 40);
	ctx.fillText("Press E to edit map" , 10, 70);
	ctx.fillText("Press any key to continue.", 10, 100);

	document.onkeydown = getInput;
}

function getInput(e)
{
	if(e.keyCode == 69)
	{
		editMap();
	}
	else
	{
		start();
	}
}

function editMap()
{
	var ctx = document.getElementById("gameScreen").getContext('2d');
	ctx.fillStyle = "#DDDDDD";
	ctx.fillRect(0, 0, 640, 640);
	ctx.fillStyle = "black";
	ctx.fillText("editing map", 50, 50);
	ctx.fillText("press Q to return to main menu", 50, 90);

	document.onkeydown = getInputEdit;

	createEditOptions();
}

function getInputEdit(e)
{
	if(e.keyCode == 81)
	{
		menu();
		addItemButton = document.getElementById("addItem");
		document.body.removeChild(addItemButton);
	}
}

function createEditOptions()
{
	addItem = document.createElement("input");
	addItem.id = "addItem";
	addItem.type = "button";
	addItem.value = "Add Item";
	addItem.style.position = "absolute";
	addItem.style.left = "400px";
	addItem.style.top = "350px";
	document.body.appendChild(addItem);	 
}