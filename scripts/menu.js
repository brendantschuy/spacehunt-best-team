//Create a menu for the game, from which we can load files ,create custom map, etc. 

function menu()
{
	var ctx = document.getElementById("gameScreen").getContext('2d');
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
		if(e.keyCode == 69)
		{
			this.presets = editMap();
		}
		else if(e.keyCode == 76)
		{
			//load stuff
		}
		else
		{
			start(presets);
		}
	}

	function editMap()
	{
		var ctx = document.getElementById("gameScreen").getContext('2d');
		ctx.fillStyle = "#DDDDDD";
		ctx.fillRect(0, 0, 450, 450);
		ctx.fillStyle = "black";
		ctx.font = "20px Arial";
		ctx.beginPath();

		document.onkeydown = getInputEdit;

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
				this.presets.push(new Asteroid(x, y));
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

	document.onkeydown = getInput;

}


function getInputEdit(e)
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
	else if(e.keyCode == 69)	//e
	{
		e.preventDefault();
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
		addItem.style.top = 160 + 60 * i;
		addItem.style.left = 380;
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
	xCoord.style.top = 450;
	xCoord.style.left = 600;
	xCoord.style.width = 50;
	xCoord.style.font = "30px Arial";
	document.body.appendChild(xCoord);

	yCoord = document.createElement("input");
	yCoord.type = "text";
	yCoord.className = "coordInput";
	yCoord.id = "coordInput_y";
	yCoord.style.position = "absolute";
	yCoord.style.top = 450;
	yCoord.style.left = 675;
	yCoord.style.width = 50;
	yCoord.style.font = "30px Arial";
	document.body.appendChild(yCoord);	

	editHeaderX = document.createElement("p");
	editHeaderX.appendChild(document.createTextNode("x"));
	editHeaderX.id = "xCaption";
	//editHeader.text = "Edit Game";
	editHeaderX.style.position = "absolute";
	editHeaderX.style.top = 410;
	editHeaderX.style.left = 620;
	//editHeader.appendChild(t);
	document.body.appendChild(editHeaderX);

	editHeaderY = document.createElement("p");
	editHeaderY.appendChild(document.createTextNode("y"));
	editHeaderY.id = "yCaption";
	//editHeader.text = "Edit Game";
	editHeaderY.style.position = "absolute";
	editHeaderY.style.top = 410;
	editHeaderY.style.left = 695;
	//editHeader.appendChild(t);
	document.body.appendChild(editHeaderY);

	addButton = document.createElement("input");
	addButton.id = "clickToAddButton";
	addButton.type = "button";
	addButton.value = "Add Item";
	addButton.style.position = "absolute";
	addButton.style.top = 540;
	addButton.style.left = 630;
	//addButton.className = "addButtons";
	document.body.appendChild(addButton);

	randomValues = document.createElement("input");
	randomValues.id = "randomizeXYButton";
	randomValues.type = "button";
	randomValues.value = "Randomize";
	randomValues.style.position = "absolute";
	randomValues.style.top = 490;
	randomValues.style.left = 630;
	document.body.appendChild(randomValues);
}

function writeAddItemName(val)
{
	if(document.getElementById("addItemNameTag"))
	{
		document.body.removeChild(addItemNameTag);
	}
	addItemNameTag = document.createElement("p");
	addItemNameTag.appendChild(document.createTextNode(val));
	addItemNameTag.id = "addItemNameTag";
	addItemNameTag.style.position = "absolute";
	addItemNameTag.style.top = 200;
	addItemNameTag.style.left = 620;
	document.body.appendChild(addItemNameTag);

	if(document.getElementById("addItemImage"))
	{
		document.body.removeChild(addItemImage);
	}
	addItemImage = document.createElement("img");
	addItemImage.id = "addItemImage";
	addItemImage.style.position = "absolute";
	addItemImage.style.top = 250;
	addItemImage.style.left = 620;
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