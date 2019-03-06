//Create a menu for the game, from which we can load files ,create custom map, etc. 

function menu()
{
	var cvs = document.getElementById("gameScreen");
	var cvsCoords = getAbsPosition(cvs);
	var ctx = cvs.getContext('2d');
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 450, 450);
	ctx.fillStyle = "black";
	ctx.fillText("Welcome to Spacehunt", 10, 10);
	ctx.fillText("Press L to load map from file", 10, 40);
	ctx.fillText("Press E to edit map" , 10, 70);
	ctx.fillText("Press any key to continue.", 10, 100);

	

	//If statement is important to not overwrite the array
	if(!this.presets)
	{
		this.presets = [];
	}

	function getInput(e)
	{
		if(e.keyCode == 69)			//E
		{
			//doesn't actually overwrite presets, just adds to it
			this.presets = editMapMenu();
		}
		else if(e.keyCode == 76)	//L
		{
			//DOES overwrite presets
			this.presets = loadFileMenu();
		}
		else
		{
			start(presets);
		}
	}

	function editMapMenu()
	{
		var ctx = document.getElementById("gameScreen").getContext('2d');
		ctx.fillStyle = "#DDDDDD";
		ctx.fillRect(0, 0, 450, 450);
		ctx.fillStyle = "black";
		ctx.font = "20px Arial";
		ctx.beginPath();

		document.onkeydown = getInputEditMenu;

		//deleteMainMenuOptions();
		createEditOptions();

		document.getElementById("clickToAddButton").onclick = function()
		{
			var xc = document.getElementById("coordInput_x").value;
			var yc = document.getElementById("coordInput_y").value;
			if(!xc||!yc)
			{
				alert("Error: Please enter a value in each coordinate box.");
			}
			else
			{
				xc = parseInt(xc);
				yc = parseInt(yc);
				addItemToPresets(xc, yc);
			}
		}

		document.getElementById("randomizeXYButton").onclick = function()
		{
			document.getElementById("coordInput_x").value = Math.floor(Math.random() * MAP_MAX_X);
			document.getElementById("coordInput_y").value = Math.floor(Math.random() * MAP_MAX_Y);
		}

		return this.presets;
	}

	function addItemToPresets(x ,y)
	{
		newItemName = document.getElementById("addItemNameTag").textContent;
		//newItemName = window[newItemName];
		switch(newItemName)
		{
			case("Asteroid") : 
				if(x == SHIP_START_X && y == SHIP_START_Y)
				{
					alert("Haha very funny.");
				}
				else
				{
					this.presets.push(new Asteroid(x, y));
				}
				break;
			case("Xeon") :
				this.presets.push(new Xeon(x, y));
				break;
			case("Ryzen") :
				this.presets.push(new Ryzen(x, y));
				break;
			case("Celeron") :
				this.presets.push(new Celeron(x, y));
				break;
			case("Space Station") :
				this.presets.push(new SpaceStation(x, y));
				break;
			case("Abandoned Freighter") :
				this.presets.push(new AbandonedFreighter(x, y));
				break;
			case("Meteor Storm") :
				this.presets.push(new MeteorStorm(x, y));
				break;	
		}
	}

	function loadFileMenu()
	{
		var ctx = document.getElementById("gameScreen").getContext('2d');
		ctx.fillStyle = "#DDDDDD";
		ctx.fillRect(0, 0, 450, 450);
		ctx.fillStyle = "black";
		ctx.font = "20px Arial";
		ctx.beginPath();
		
		//deleteMainMenuOptions();
		//createLoadFileMenuOptions();

		fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.style.position = "absolute";
		fileInput.style.top = cvsCoords.y + 200;
		fileInput.style.left = cvsCoords.x + 200;
		document.body.appendChild(fileInput);


		new_presets = [];	//we want to overwrite whatever was previously in the obstacles array

		/******************************************************
		*******************************************************
		*************READ INPUT FILE***************************
		*******************************************************
		******************************************************/

		document.onkeydown = getInputFileMenu;

		//only return new array if there are things in it; if there was some sort of error and 
		//this array is empty, just default to the normal game state
		if(new_presets)
		{
			return new_presets;
		}
		else
		{
			return this.presets;
		}
	}

	document.onkeydown = getInput;

}


function getInputEditMenu(e)
{
	if(e.keyCode == 81)	//q
	{
		menu();
		for(i = 0; i < 7; i++)
		{
			addItemButton = document.getElementById("addItem" + i + 1);
			document.body.removeChild(addItemButton);
		}
		document.body.removeChild(xCoord);
		document.body.removeChild(yCoord);
		document.body.removeChild(clickToAddButton);
		document.body.removeChild(xCaption);
		document.body.removeChild(yCaption);
		document.body.removeChild(randomValues);
		document.body.removeChild(returnToMainMenu);
		if(document.getElementById("addItemNameTag"))
		{
			document.body.removeChild(addItemNameTag);
			document.body.removeChild(addItemImage);
		}

		/*presets.forEach(function(thing)
		{
			alert(thing.constructor.name);
		});*/
	}
}

function getInputFileMenu(e)
{
	if(e.keyCode == 81)	//q
	{
		menu();
		//deleteFileMenuOptions();
		document.body.removeChild(fileInput);
	}
}

function createEditOptions()
{
	var cvsCoords = getAbsPosition(document.getElementById("gameScreen"));

	//browser_x = getPosition(document.getElementById("gameScreen")).x;
	//alert(browser_x);
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
		addItem.style.top = cvsCoords.y + 20 + 60 * i;
		addItem.style.left = cvsCoords.x + 20;
		addItem.className = "addButtons";
		addItem.onclick = function()
		{

			writeAddItemName(String(this.value));
		}
		document.body.appendChild(addItem);
	}

	xCoord = document.createElement("input");
	xCoord.type = "text";
	xCoord.className = "coordInput";
	xCoord.id = "coordInput_x";
	xCoord.style.position = "absolute";
	xCoord.style.top = 304 + cvsCoords.y;
	xCoord.style.left = 228 + cvsCoords.x;
	xCoord.style.width = 50;
	xCoord.style.font = "30px Arial";
	document.body.appendChild(xCoord);

	yCoord = document.createElement("input");
	yCoord.type = "text";
	yCoord.className = "coordInput";
	yCoord.id = "coordInput_y";
	yCoord.style.position = "absolute";
	yCoord.style.top = 304 + cvsCoords.y;
	yCoord.style.left = 303 + cvsCoords.x;
	yCoord.style.width = 50;
	yCoord.style.font = "30px Arial";
	document.body.appendChild(yCoord);	

	editHeaderX = document.createElement("p");
	editHeaderX.appendChild(document.createTextNode("x"));
	editHeaderX.id = "xCaption";
	//editHeader.text = "Edit Game";
	editHeaderX.style.position = "absolute";
	editHeaderX.style.top = 264 + cvsCoords.y;
	editHeaderX.style.left = 248 + cvsCoords.x;
	//editHeader.appendChild(t);
	document.body.appendChild(editHeaderX);

	editHeaderY = document.createElement("p");
	editHeaderY.appendChild(document.createTextNode("y"));
	editHeaderY.id = "yCaption";
	//editHeader.text = "Edit Game";
	editHeaderY.style.position = "absolute";
	editHeaderY.style.top = 264 + cvsCoords.y;
	editHeaderY.style.left = 323 + cvsCoords.x;
	//editHeader.appendChild(t);
	document.body.appendChild(editHeaderY);

	addButton = document.createElement("input");
	addButton.id = "clickToAddButton";
	addButton.type = "button";
	addButton.value = "Add Item";
	addButton.style.position = "absolute";
	addButton.style.top = 394 + cvsCoords.y;
	addButton.style.left = 248 + cvsCoords.x;
	//addButton.className = "addButtons";
	document.body.appendChild(addButton);

	randomValues = document.createElement("input");
	randomValues.id = "randomizeXYButton";
	randomValues.type = "button";
	randomValues.value = "Randomize";
	randomValues.style.position = "absolute";
	randomValues.style.top = 344 + cvsCoords.y;
	randomValues.style.left = 258 + cvsCoords.x;
	document.body.appendChild(randomValues);

	returnToMainMenu = document.createElement("P");
	returnToMainMenu.appendChild(document.createTextNode("Press \"Q\" to return to main menu."));
	returnToMainMenu.id = "returnToMainMenuText";
	returnToMainMenu.style.position = "absolute";
	returnToMainMenu.style.top = 410 + cvsCoords.y;
	returnToMainMenu.style.left = 200 + cvsCoords.x;
	document.body.appendChild(returnToMainMenu);
}

function writeAddItemName(val)
{
	var cvsCoords = getAbsPosition(document.getElementById("gameScreen"));

	if(document.getElementById("addItemNameTag"))
	{
		document.body.removeChild(addItemNameTag);
	}
	addItemNameTag = document.createElement("p");
	addItemNameTag.appendChild(document.createTextNode(val));
	addItemNameTag.id = "addItemNameTag";
	addItemNameTag.style.position = "absolute";
	addItemNameTag.style.top = 54 + cvsCoords.y;
	addItemNameTag.style.left = 248 + cvsCoords.x;
	document.body.appendChild(addItemNameTag);

	if(document.getElementById("addItemImage"))
	{
		document.body.removeChild(addItemImage);
	}
	addItemImage = document.createElement("img");
	addItemImage.id = "addItemImage";
	addItemImage.style.position = "absolute";
	addItemImage.style.top = 104 + cvsCoords.y;
	addItemImage.style.left = 248 + cvsCoords.x;
	addItemImage.src = "img/" + val + ".png";
	if(val == "Space Station")
	{
		addItemImage.height = 100;
		addItemImage.width = 100;
	}
	if(val == "Meteor Storm")
	{
		addItemImage.src = "img/meteor_still.png";
	}
	document.body.appendChild(addItemImage);
}

//Returns absolute position of top left corner of canvas
function getAbsPosition(element)
{
   var rect = element.getBoundingClientRect();
   return {x:rect.left,y:rect.top}
}