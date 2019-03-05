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
	else if(e.keyCode == 76)
	{
		//load stuff
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
	ctx.font = "20px Arial";
	ctx.beginPath();
	//ctx.fillText("EDITING GAME MAP", 20, 20);
	//ctx.fillText("Press Q to return to the main menu.", 20, 50);

	document.onkeydown = getInputEdit;

	createEditOptions();

	//Things we need to be able to add to the game screen:

	//Game parameters
	//Celestial objects
		//Asteroid
		//Planet
		//Space station
		//Recipe
}

function getInputEdit(e)
{
	if(e.keyCode == 81)
	{
		menu();
		for(i = 0; i < 7; i++)
		{
			addItemButton = document.getElementById("addItem" + i + 1);
			document.body.removeChild(addItemButton);
		}
	}
}

function createEditOptions()
{
	addables = [];
	addables.push("Asteroid");
	addables.push("Celeron");
	addables.push("Ryzen");
	addables.push("Xeon");
	addables.push("Space Station");
	addables.push("Abandoned Freighter");
	addables.push("Meteor Storm");
	numAddables = addables.length;



	for(i = 0; i < numAddables; i++)
	{
		addItem = document.createElement("input");
		addItem.id = "addItem" + i + 1;
		addItem.type = "button";
		addItem.value = addables[i];
		addItem.style.position = "absolute";
		addItem.style.top = 180 + i * 60;
		addItem.style.left = 400;
		addItem.style.className = "addButtons";
		document.body.appendChild(addItem);
	}
	/*addItem = document.createElement("input");
	addItem.id = "addItem";
	addItem.type = "button";
	addItem.value = "Add Item";
	document.body.appendChild(addItem);	*/ 
}