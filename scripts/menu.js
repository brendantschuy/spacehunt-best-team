//Create a menu for the game, from which we can load files ,create custom map, etc. 

//currently disabled. to enable, change "onload" in index.html to call menu()
function menu()
{
	var presets = [];
	//this.presets = new Array();
	var ctx = document.getElementById("gameScreen").getContext('2d');
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 450, 450);
	ctx.fillStyle = "black";
	ctx.fillText("Welcome to Spacehunt", 10, 10);
	ctx.fillText("Press L to load map from file", 10, 40);
	ctx.fillText("Press E to edit map" , 10, 70);
	ctx.fillText("Press any key to continue.", 10, 100);

	presets.push(new Asteroid(12, 10));
	//this.presets.push(new Asteroid(10, 12));

	presets.forEach(function(thing)
	{
		alert("In Menu, before doing anything: " + thing.constructor.name);
	});

	function getInput(e)
	{
		if(e.keyCode == 69)
		{
			presets = editMap(presets);
			presets.forEach(function(thing)
			{
				alert("After calling edit map: " + thing.constructor.name);
			});
		}
		else if(e.keyCode == 76)
		{
			//load stuff
		}
		else
		{
			presets.forEach(function(thing)
			{
				alert("Before calling start: " + thing.constructor.name);
			});
			start(presets);
		}
	}

	function editMap(presetObjs)
	{
		presetObjs.push(new Asteroid(10, 12));
		presetObjs.push(new Asteroid(9, 10));
		presetObjs.push(new Asteroid(9, 8));
		//presets = [];
		var ctx = document.getElementById("gameScreen").getContext('2d');
		ctx.fillStyle = "#DDDDDD";
		ctx.fillRect(0, 0, 450, 450);
		ctx.fillStyle = "black";
		ctx.font = "20px Arial";
		ctx.beginPath();
		//ctx.fillText("EDITING GAME MAP", 150, 80);
		//ctx.fillText("Press Q to return to the main menu.", 20, 50);

		document.onkeydown = getInputEdit;

		createEditOptions();

		document.getElementById("clickToAddButton").onclick = function()
		{
			//alert("Hello there from our button");
			presetObjs.push(new Asteroid(9, 10));
			//presets.push(new Asteroid(10, 13));
		}

		presetObjs.forEach(function(thing)
		{
			alert("Within edit map: " + thing.constructor.name);
		});
		return presetObjs;
	}

	function addAsteroid()
	{
		//presets.push(new Asteroid(9, 10));
		//return presets;
	}

	document.onkeydown = getInput;

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
		document.body.removeChild(xCoord);
		document.body.removeChild(yCoord);
		document.body.removeChild(clickToAddButton);
		document.body.removeChild(xCaption);
		document.body.removeChild(yCaption);

		/*presets.forEach(function(thing)
		{
			alert(thing.constructor.name);
		});*/
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
		document.body.appendChild(addItem);
	}

	xCoord = document.createElement("input");
	xCoord.type = "text";
	xCoord.className = "coordInput";
	xCoord.style.position = "absolute";
	xCoord.style.top = 450;
	xCoord.style.left = 600;
	xCoord.style.width = 50;
	document.body.appendChild(xCoord);

	yCoord = document.createElement("input");
	yCoord.type = "text";
	yCoord.className = "coordInput";
	yCoord.style.position = "absolute";
	yCoord.style.top = 450;
	yCoord.style.left = 675;
	yCoord.style.width = 50;
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
}