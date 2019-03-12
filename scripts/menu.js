/***************************
*********MENU.JS************
****************************

This is the first thing that runs when the webpage is loaded.
Menu produces a basic menu with three options:
	- New (default functionality)
	- Edit (add things to map, change basic settings)
	- Load (load from file)

***************************/
function menu(params)
{
	var cvs = document.getElementById("gameScreen");
	var cvsCoords = getAbsPosition(cvs);
	var ctx = cvs.getContext('2d');

	setUpMenu();

	//If statement is important to not overwrite the array
	//obstacles in the game
	if(!this.presets)
	{
		this.presets = [];
	}

	//parameters for the game
	if(!this.params)
	{
		this.params = [];
	}
	else
	{
		this.params = params;
		//alert(this.params);
	}

	function getInput(e)
	{
		if(e.keyCode == 69)			//E
		{
			//doesn't actually overwrite presets, just adds to it
			clearMenu();
			this.presets = editMapMenu();
		}
		else if(e.keyCode == 76)	//L
		{
			//DOES overwrite presets
			clearMenu();
			this.presets = loadFileMenu();
		}
		else if(e.keyCode == 78)	//N
		{
			if(!params)
			{
				params = setDefaultParameters();
			}
			removeOptions();
			//alert(params);
			clearMenu();
			start(presets, params);
		}
		else
		{
			//clearMenu();
			return;
		}
	}

	function setUpMenu()
	{
		let cvs = document.getElementById("gameScreen");
		let cvsCoords = getAbsPosition(cvs);
		let ctx = cvs.getContext('2d');
		main_bkgd = document.createElement("img");
		main_bkgd.className = "menu_bkgd";
		main_bkgd.src = "img/menu_screen_4.png";
		main_bkgd.style.left = cvsCoords.x;
		main_bkgd.style.top = cvsCoords.y;
		document.body.appendChild(main_bkgd);

		newGameButton = document.createElement("img");
		newGameButton.className = "menu_main_options";
		newGameButton.src = "img/new_game.png";
		newGameButton.style.left = cvsCoords.x + 150;
		newGameButton.style.top = cvsCoords.y + 175;
		newGameButton.onmouseover = function(){
			this.src = "img/new_game_clicked.png";
		};
		newGameButton.onmouseout = function(){
			this.src = "img/new_game.png";
		};
		newGameButton.onclick = function()
		{
			clearMenu();
			start(presets);
		}
		document.body.appendChild(newGameButton);

		editGameButton = document.createElement("img");
		editGameButton.className = "menu_main_options";
		editGameButton.src = "img/edit_game.png";
		editGameButton.style.left = cvsCoords.x + 135;
		editGameButton.style.top = cvsCoords.y + 275;
		editGameButton.onmouseover = function(){
			this.src = "img/edit_game_clicked.png";
		};
		editGameButton.onmouseout = function(){
			this.src = "img/edit_game.png";
		};
		editGameButton.onclick = function()
		{
			clearMenu();
			presets = editMapMenu();
		}
		document.body.appendChild(editGameButton);

		loadGameButton = document.createElement("img");
		loadGameButton.className = "menu_main_options";
		loadGameButton.src = "img/load_game.png";
		loadGameButton.style.left = cvsCoords.x + 135;
		loadGameButton.style.top = cvsCoords.y + 375;
		loadGameButton.onmouseover = function(){
			this.src = "img/load_game_clicked.png";
		};
		loadGameButton.onmouseout = function(){
			this.src = "img/load_game.png";
		};
		loadGameButton.onclick = function()
		{
			clearMenu();
			presets = loadFileMenu();
		}
		document.body.appendChild(loadGameButton);
	}

	//Creates edit menu options
	//This will be split up into a few different functions soonTM
	function editMapMenu(params)
	{
		bkgd = document.createElement("img");
		bkgd.className = "menu_bkgd";
		bkgd.src = "img/menu_screen_3.png";
		bkgd.style.left = cvsCoords.x;
		bkgd.style.top = cvsCoords.y;
		document.body.appendChild(bkgd);

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
				document.getElementById("coordInput_x").value = "";
				document.getElementById("coordInput_y").value = "";
			}
		}

		document.getElementById("randomizeXYButton").onclick = function()
		{
			document.getElementById("coordInput_x").value = Math.floor(Math.random() * MAP_MAX_X);
			document.getElementById("coordInput_y").value = Math.floor(Math.random() * MAP_MAX_Y);
		}

		moreOptionsButton = document.createElement("input");
		moreOptionsButton.id = "moreOptionsButton";
		moreOptionsButton.type = "button";
		moreOptionsButton.value = "More Options";
		moreOptionsButton.className = "button-alt";
		moreOptionsButton.style.position = "absolute";
		moreOptionsButton.style.top = 380 + cvsCoords.y;
		moreOptionsButton.style.left = 241 + cvsCoords.x;
		moreOptionsButton.onclick = function()
		{
			document.body.removeChild(bkgd);
			moreOptions();
			clearEdit();
		}
		document.body.appendChild(moreOptionsButton);

		return this.presets;
	}


	function clearMenu()
	{
		document.body.removeChild(main_bkgd);
		document.body.removeChild(newGameButton);
		document.body.removeChild(editGameButton);
		document.body.removeChild(loadGameButton);
	}
	//Adds a single item to the preset array
	//This could be altered to be more generalized & work with file input too
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

	//Opens up a basic menu with "choose file" dialog
	function loadFileMenu()
	{
		bkgd = document.createElement("img");
		bkgd.className = "menu_bkgd";
		bkgd.src = "img/menu_screen_2.png";
		bkgd.style.left = cvsCoords.x;
		bkgd.style.top = cvsCoords.y;
		document.body.appendChild(bkgd);
		
		//deleteMainMenuOptions();
		//createLoadFileMenuOptions();

		fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.style.position = "absolute";
		fileInput.style.top = cvsCoords.y + 200;
		fileInput.style.left = cvsCoords.x + 200;
		document.body.appendChild(fileInput);

		returnMainMenuText = document.createElement("P");
		returnMainMenuText.appendChild(document.createTextNode("Press \"Q\" to return to main menu."));
		returnMainMenuText.id = "returnMainMenuTextText";
		returnMainMenuText.style.position = "absolute";
		returnMainMenuText.style.top = 410 + cvsCoords.y;
		returnMainMenuText.style.left = 200 + cvsCoords.x;
		document.body.appendChild(returnMainMenuText);

		returnMainMenuFile = document.createElement("input");
		returnMainMenuFile.id = "returnMainMenuFile";
		returnMainMenuFile.type = "button";
		returnMainMenuFile.className = "button-alt";
		returnMainMenuFile.value = "Back to Menu";
		returnMainMenuFile.style.position = "absolute";
		returnMainMenuFile.style.top = 430 + cvsCoords.y;
		returnMainMenuFile.style.left = 5 + cvsCoords.x;
		document.body.appendChild(returnMainMenuFile);
		returnMainMenuFile.onclick = function()
		{
			//document.body.removeChild(main_bkgd);
			menu();
			//deleteFileMenuOptions();
			document.body.removeChild(bkgd);
			document.body.removeChild(fileInput);
			document.body.removeChild(returnMainMenuFile);
			document.body.removeChild(returnMainMenuText);
		}


		new_presets = [];	//we want to overwrite whatever was previously in the obstacles array

		/******************************************************
		*******************************************************
		*************READ INPUT FILE***************************
		*******************************************************
		******************************************************/
		load();
		//add what's in input file to new_presets


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

//handles input on the edit menu page
function getInputEditMenu(e)
{
	if(e.keyCode == 81 || e.keyCode == 27)	//q or <esc>
	{
		document.body.removeChild(bkgd);
		menu();
		clearEdit();


		/*presets.forEach(function(thing)
		{
			alert(thing.constructor.name);
		});*/
	}
}

//handles input on the file menu page
function getInputFileMenu(e)
{
	if(e.keyCode == 81 || e.keyCode == 27)	//q or <esc>
	{
		//document.body.removeChild(main_bkgd);
		menu();
		//deleteFileMenuOptions();

		document.body.removeChild(fileInput);
		document.body.removeChild(returnToMainMenu);
	}
}

//generates the interface on the edit menu page
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
		addItem.style.top = cvsCoords.y + 5 + 60 * i;
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
	xCoord.style.color = "black";
	xCoord.style.top = 204 + cvsCoords.y;
	xCoord.style.left = 228 + cvsCoords.x;
	xCoord.style.width = 50;
	xCoord.style.font = "30px Arial";
	document.body.appendChild(xCoord);

	yCoord = document.createElement("input");
	yCoord.type = "text";
	yCoord.className = "coordInput";
	yCoord.id = "coordInput_y";
	yCoord.style.position = "absolute";
	yCoord.style.color = "black";
	yCoord.style.top = 204 + cvsCoords.y;
	yCoord.style.left = 303 + cvsCoords.x;
	yCoord.style.width = 50;
	yCoord.style.font = "30px Arial";
	document.body.appendChild(yCoord);	

	editHeaderX = document.createElement("p");
	editHeaderX.appendChild(document.createTextNode("x"));
	editHeaderX.id = "xCaption";
	editHeaderX.className = "coordCaption";
	editHeaderX.style.position = "absolute";
	editHeaderX.style.top = 164 + cvsCoords.y;
	editHeaderX.style.left = 248 + cvsCoords.x;
	//editHeader.appendChild(t);
	document.body.appendChild(editHeaderX);

	editHeaderY = document.createElement("p");
	editHeaderY.appendChild(document.createTextNode("y"));
	editHeaderY.id = "yCaption";
	editHeaderY.className = "coordCaption";
	editHeaderY.style.position = "absolute";
	editHeaderY.style.top = 164 + cvsCoords.y;
	editHeaderY.style.left = 323 + cvsCoords.x;
	//editHeader.appendChild(t);
	document.body.appendChild(editHeaderY);

	addButton = document.createElement("input");
	addButton.id = "clickToAddButton";
	addButton.className = "button-alt";
	addButton.type = "button";
	addButton.value = "Add Item";
	addButton.style.position = "absolute";
	addButton.style.top = 294 + cvsCoords.y;
	addButton.style.left = 241 + cvsCoords.x;
	//addButton.className = "addButtons";
	document.body.appendChild(addButton);

	randomValues = document.createElement("input");
	randomValues.id = "randomizeXYButton";
	randomValues.className = "button-alt";
	randomValues.type = "button";
	randomValues.value = "Randomize";
	randomValues.style.position = "absolute";
	randomValues.style.top = 248 + cvsCoords.y;
	randomValues.style.left = 241 + cvsCoords.x;
	document.body.appendChild(randomValues);

	returnMainMenuButton = document.createElement("input");
	returnMainMenuButton.id = "returnMainMenuButton";
	returnMainMenuButton.type = "button";
	returnMainMenuButton.className = "button-alt";
	returnMainMenuButton.value = "Back to Menu";
	returnMainMenuButton.style.position = "absolute";
	returnMainMenuButton.style.top = 430 + cvsCoords.y;
	returnMainMenuButton.style.left = 5 + cvsCoords.x;
	returnMainMenuButton.onclick = function()
	{
		document.body.removeChild(bkgd);
		menu();
		clearEdit();
	}
	document.body.appendChild(returnMainMenuButton);	
}

//dynamically changes what is on screen when adding objects
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
	addItemNameTag.style.top = 4 + cvsCoords.y;
	addItemNameTag.style.left = 248 + cvsCoords.x;
	document.body.appendChild(addItemNameTag);

	if(document.getElementById("addItemImage"))
	{
		document.body.removeChild(addItemImage);
	}
	addItemImage = document.createElement("img");
	addItemImage.id = "addItemImage";
	addItemImage.style.position = "absolute";
	addItemImage.style.top = 44 + cvsCoords.y;
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

/* persistent state stuff */ 

// loads game state from browser 
function load() {
	if (!supportsLocalStorage() || localStorage["activeGame"] == "false") {
	  console.log("Browser does not support localStorage!");
	  return false; 
	}
	let gameToLoad = prompt("Which game do you want to load?");   //don't have multiple saved states yet
	this.ship.cpx = JSON.parse(localStorage.getItem("shipX"));
	this.ship.cpy = JSON.parse(localStorage.getItem("shipY"));
	this.ship.energy = JSON.parse(localStorage.getItem("energy"));
	this.ship.supplies = JSON.parse(localStorage.getItem("supplies"));
	this.ship.currency = JSON.parse(localStorage.getItem("currency"));
}

function clearEdit()
{
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
	document.body.removeChild(returnMainMenuButton);
	document.body.removeChild(moreOptionsButton);
	if(document.getElementById("addItemNameTag"))
	{
		document.body.removeChild(addItemNameTag);
		document.body.removeChild(addItemImage);
	}
}

function moreOptions(params)
{

	let cvsCoords = getAbsPosition(document.getElementById("gameScreen"));
	bkgd = document.createElement("img");
	bkgd.className = "menu_bkgd";
	bkgd.id = "moreOptionsBkgd";
	bkgd.src = "img/menu_screen_2.png";
	bkgd.style.left = cvsCoords.x;
	bkgd.style.top = cvsCoords.y;
	document.body.appendChild(bkgd);

    if(!this.retParams)
   	{
		this.retParams = [];
	}

	document.onkeydown = getInputMOMenu;

		//deleteMainMenuOptions();
	createMOOptions();

	//return gameOptions;

	function createMOOptions()
	{
		let cvsCoords = getAbsPosition(document.getElementById("gameScreen"));

		devOptionsCBox = document.createElement("input");
		devOptionsCBox.id = "devOptionsCBox";
		devOptionsCBox.type = "checkbox";
		devOptionsCBox.value = "Back to Menu";
		devOptionsCBox.style.position = "absolute";
		devOptionsCBox.style.top = 300 + cvsCoords.y;
		devOptionsCBox.style.left = 50 + cvsCoords.x;
		devOptionsCBox.onclick = function()
		{
			/*document.body.removeChild(bkgd);
			menu();
			clearEdit();*/
		}
		document.body.appendChild(devOptionsCBox);	

		randWormholeCBox = document.createElement("input");
		randWormholeCBox.id = "randWormholeCBox";
		randWormholeCBox.type = "checkbox";
		randWormholeCBox.value = "Back to Menu";
		randWormholeCBox.style.position = "absolute";
		randWormholeCBox.style.top = 350 + cvsCoords.y;
		randWormholeCBox.style.left = 50 + cvsCoords.x;
		randWormholeCBox.onclick = function()
		{
			/*document.body.removeChild(bkgd);
			menu();
			clearEdit();*/
		}
		document.body.appendChild(randWormholeCBox);	

		bgMusicCBox = document.createElement("input");
		bgMusicCBox.id = "bgMusicCBox";
		bgMusicCBox.type = "checkbox";
		bgMusicCBox.value = "Back to Menu";
		bgMusicCBox.style.position = "absolute";
		bgMusicCBox.style.top = 400 + cvsCoords.y;
		bgMusicCBox.style.left = 50 + cvsCoords.x;
		bgMusicCBox.onclick = function()
		{
			/*document.body.removeChild(bkgd);
			menu();
			clearEdit();*/
		}
		document.body.appendChild(bgMusicCBox);	

		toggleHudCBox = document.createElement("input");
		toggleHudCBox.id = "toggleHudCBox";
		toggleHudCBox.type = "checkbox";
		toggleHudCBox.value = "Back to Menu";
		toggleHudCBox.style.position = "absolute";
		toggleHudCBox.style.top = 300 + cvsCoords.y;
		toggleHudCBox.style.left = 250 + cvsCoords.x;
		toggleHudCBox.onclick = function()
		{
			/*document.body.removeChild(bkgd);
			menu();
			clearEdit();*/
		}
		document.body.appendChild(toggleHudCBox);	

		speedRunCBox = document.createElement("input");
		speedRunCBox.id = "speedRunCBox";
		speedRunCBox.type = "checkbox";
		speedRunCBox.value = "Back to Menu";
		speedRunCBox.style.position = "absolute";
		speedRunCBox.style.top = 350 + cvsCoords.y;
		speedRunCBox.style.left = 250 + cvsCoords.x;
		speedRunCBox.onclick = function()
		{
			/*document.body.removeChild(bkgd);
			menu();
			clearEdit();*/
		}
		document.body.appendChild(speedRunCBox);	

		devOptionsCBoxCaption = document.createElement("p");
		devOptionsCBoxCaption.appendChild(document.createTextNode("Immortality"));
		devOptionsCBoxCaption.id = "devOptionsCBoxCaption";
		devOptionsCBoxCaption.className = "CBoxCaptions";
		devOptionsCBoxCaption.style.position = "absolute";
		devOptionsCBoxCaption.style.top = 285 + cvsCoords.y;
		devOptionsCBoxCaption.style.left = 75 + cvsCoords.x;
		document.body.appendChild(devOptionsCBoxCaption);

		randWormholesCBoxCaption = document.createElement("p");
		randWormholesCBoxCaption.appendChild(document.createTextNode("Random Wormholes"));
		randWormholesCBoxCaption.id = "randWormholesCBoxCaption";
		randWormholesCBoxCaption.className = "CBoxCaptions";
		randWormholesCBoxCaption.style.position = "absolute";
		randWormholesCBoxCaption.style.top = 335 + cvsCoords.y;
		randWormholesCBoxCaption.style.left = 75 + cvsCoords.x;
		document.body.appendChild(randWormholesCBoxCaption);

		bgMusicCBoxCaption = document.createElement("p");
		bgMusicCBoxCaption.appendChild(document.createTextNode("Background Music"));
		bgMusicCBoxCaption.id = "bgMusicCBoxCaption";
		bgMusicCBoxCaption.className = "CBoxCaptions";
		bgMusicCBoxCaption.style.position = "absolute";
		bgMusicCBoxCaption.style.top = 385 + cvsCoords.y;
		bgMusicCBoxCaption.style.left = 75 + cvsCoords.x;
		document.body.appendChild(bgMusicCBoxCaption);

		toggleHudCBoxCaption = document.createElement("p");
		toggleHudCBoxCaption.appendChild(document.createTextNode("Toggle HUD"));
		toggleHudCBoxCaption.id = "toggleHudCBoxCaption";
		toggleHudCBoxCaption.className = "CBoxCaptions";
		toggleHudCBoxCaption.style.position = "absolute";
		toggleHudCBoxCaption.style.top = 285 + cvsCoords.y;
		toggleHudCBoxCaption.style.left = 275 + cvsCoords.x;
		document.body.appendChild(toggleHudCBoxCaption);

		speedRunModeCBoxCaption = document.createElement("p");
		speedRunModeCBoxCaption.appendChild(document.createTextNode("SpeedRun Mode"));
		speedRunModeCBoxCaption.id = "speedRunModeCBoxCaption";
		speedRunModeCBoxCaption.className = "CBoxCaptions";
		speedRunModeCBoxCaption.style.position = "absolute";
		speedRunModeCBoxCaption.style.top = 335 + cvsCoords.y;
		speedRunModeCBoxCaption.style.left = 275 + cvsCoords.x;
		document.body.appendChild(speedRunModeCBoxCaption);

		startingSuppliesEntryCaption = document.createElement("p");
		startingSuppliesEntryCaption.appendChild(document.createTextNode("Starting Supplies"));
		startingSuppliesEntryCaption.id = "startingSuppliesEntryCaption";
		startingSuppliesEntryCaption.className = "CBoxCaptions";
		startingSuppliesEntryCaption.style.position = "absolute";
		startingSuppliesEntryCaption.style.top = 175 + cvsCoords.y;
		startingSuppliesEntryCaption.style.left = 290 + cvsCoords.x;
		document.body.appendChild(startingSuppliesEntryCaption);

		startingEnergyEntryCaption = document.createElement("p");
		startingEnergyEntryCaption.appendChild(document.createTextNode("Starting Energy"));
		startingEnergyEntryCaption.id = "startingEnergyEntryCaption";
		startingEnergyEntryCaption.className = "CBoxCaptions";
		startingEnergyEntryCaption.style.position = "absolute";
		startingEnergyEntryCaption.style.top = 75 + cvsCoords.y;
		startingEnergyEntryCaption.style.left = 290 + cvsCoords.x;
		document.body.appendChild(startingEnergyEntryCaption);

		boardSizeInputCaption = document.createElement("p");
		boardSizeInputCaption.appendChild(document.createTextNode("Board Size (x, y)"));
		boardSizeInputCaption.id = "boardSizeInputCaption";
		boardSizeInputCaption.className = "CBoxCaptions";
		boardSizeInputCaption.style.position = "absolute";
		boardSizeInputCaption.style.top = 75 + cvsCoords.y;
		boardSizeInputCaption.style.left = 75 + cvsCoords.x;
		document.body.appendChild(boardSizeInputCaption);

		startingPositionInputCaption = document.createElement("p");
		startingPositionInputCaption.appendChild(document.createTextNode("Starting Position (x, y)"));
		startingPositionInputCaption.id = "startingPositionInputCaption";
		startingPositionInputCaption.className = "CBoxCaptions";
		startingPositionInputCaption.style.position = "absolute";
		startingPositionInputCaption.style.top = 175 + cvsCoords.y;
		startingPositionInputCaption.style.left = 55 + cvsCoords.x;
		document.body.appendChild(startingPositionInputCaption);

		boardSizeInputX = document.createElement("input");
		boardSizeInputX.type = "text";
		boardSizeInputX.className = "coordInput";
		boardSizeInputX.id = "boardSizeInputX";
		boardSizeInputX.value = 128;
		boardSizeInputX.style.position = "absolute";
		boardSizeInputX.style.color = "black";
		boardSizeInputX.style.top = 130 + cvsCoords.y;
		boardSizeInputX.style.left = 45 + cvsCoords.x;
		boardSizeInputX.style.width = 70;
		boardSizeInputX.style.font = "30px Arial";
		boardSizeInputX.style.textAlign = "center";
		document.body.appendChild(boardSizeInputX);	

		boardSizeInputY = document.createElement("input");
		boardSizeInputY.type = "text";
		boardSizeInputY.className = "coordInput";
		boardSizeInputY.id = "boardSizeInputY";
		boardSizeInputY.value = 128;
		boardSizeInputY.style.position = "absolute";
		boardSizeInputY.style.color = "black";
		boardSizeInputY.style.top = 130 + cvsCoords.y;
		boardSizeInputY.style.left = 145 + cvsCoords.x;
		boardSizeInputY.style.width = 70;
		boardSizeInputY.style.font = "30px Arial";
		boardSizeInputY.style.textAlign = "center";
		document.body.appendChild(boardSizeInputY);	

		startingPositionInputX = document.createElement("input");
		startingPositionInputX.type = "text";
		startingPositionInputX.className = "coordInput";
		startingPositionInputX.id = "startingPositionInputX";
		startingPositionInputX.value = 0;
		startingPositionInputX.style.position = "absolute";
		startingPositionInputX.style.color = "black";
		startingPositionInputX.style.top = 230 + cvsCoords.y;
		startingPositionInputX.style.left = 45 + cvsCoords.x;
		startingPositionInputX.style.width = 70;
		startingPositionInputX.style.font = "30px Arial";
		startingPositionInputX.style.textAlign = "center";
		document.body.appendChild(startingPositionInputX);	

		startingPositionInputY = document.createElement("input");
		startingPositionInputY.type = "text";
		startingPositionInputY.className = "coordInput";
		startingPositionInputY.id = "startingPositionInputY";
		startingPositionInputY.value = 0;
		startingPositionInputY.style.position = "absolute";
		startingPositionInputY.style.color = "black";
		startingPositionInputY.style.top = 230 + cvsCoords.y;
		startingPositionInputY.style.left = 145 + cvsCoords.x;
		startingPositionInputY.style.width = 70;
		startingPositionInputY.style.font = "30px Arial";
		startingPositionInputY.style.textAlign = "center";
		document.body.appendChild(startingPositionInputY);	

		startingEnergyInput = document.createElement("input");
		startingEnergyInput.type = "text";
		startingEnergyInput.className = "coordInput";
		startingEnergyInput.id = "startingEnergyInput";
		startingEnergyInput.value = 1000;
		startingEnergyInput.style.position = "absolute";
		startingEnergyInput.style.color = "black";
		startingEnergyInput.style.top = 130 + cvsCoords.y;
		startingEnergyInput.style.left = 305 + cvsCoords.x;
		startingEnergyInput.style.width = 70;
		startingEnergyInput.style.font = "30px Arial";
		startingEnergyInput.style.textAlign = "center";
		document.body.appendChild(startingEnergyInput);	

		startingSuppliesInput = document.createElement("input");
		startingSuppliesInput.type = "text";
		startingSuppliesInput.className = "coordInput";
		startingSuppliesInput.id = "startingSuppliesInput";
		startingSuppliesInput.value = 1000;
		startingSuppliesInput.style.position = "absolute";
		startingSuppliesInput.style.color = "black";
		startingSuppliesInput.style.top = 230 + cvsCoords.y;
		startingSuppliesInput.style.left = 305 + cvsCoords.x;
		startingSuppliesInput.style.width = 70;
		startingSuppliesInput.style.font = "30px Arial";
		startingSuppliesInput.style.textAlign = "center";
		document.body.appendChild(startingSuppliesInput);	


		submitOptionsButton = document.createElement("input");
		submitOptionsButton.id = "submitOptionsButton";
		submitOptionsButton.type = "button";
		submitOptionsButton.value = "Submit";
		submitOptionsButton.className = "button-alt";
		submitOptionsButton.style.position = "absolute";
		submitOptionsButton.style.top = 400 + cvsCoords.y;
		submitOptionsButton.style.left = 250 + cvsCoords.x;
		document.body.appendChild(submitOptionsButton);	
		submitOptionsButton.onclick = function()
		{
			if(changeParams())
			{
				menu(retParams);
				removeOptions();
			}
		}
	}

	function changeParams()
	{
		//alert(document.getElementById("boardSizeInputX").value);
		var bsx = document.getElementById("boardSizeInputX").value;
		var bsy = document.getElementById("boardSizeInputY").value;

		var spx = document.getElementById("startingPositionInputX").value;
		var spy = document.getElementById("startingPositionInputY").value;

		var immortalityTrue = document.getElementById("devOptionsCBox").checked;	//this is a BOOLEAN T/F not 1/0
		var bgMusicTrue = document.getElementById("bgMusicCBox").checked;
		var randWormholeTrue = document.getElementById("randWormholeCBox").checked;
		var hudTrue = document.getElementById("toggleHudCBox").checked;
		var speedRunTrue = document.getElementById("speedRunCBox").checked;

		var initEnergy = document.getElementById("startingEnergyInput").value;
		var initSupplies = document.getElementById("startingSuppliesInput").value;
		if(spx > bsx || spx < 0 || spy > bsy || spy < 0)
		{
			alert("Invalid starting position entered. Must be less than board size and greater than zero.");
			return false;
		}
		else if(bsx < 9 || bsx > 255 || bsy < 9 || bsy > 255)
		{
			alert("Invalid board size entered. Must be less than 255 and greater than 9.");
			return false;
		}
		else if(initEnergy <= 0 || initSupplies <= 0)
		{
			alert("Invalid energy or supplies. Must be greater than zero.");
			return false;
		}
		else
		{
			this.retParams[0] = bsx;
			this.retParams[1] = bsy;
			this.retParams[2] = spx;
			this.retParams[3] = spy;
			this.retParams[4] = immortalityTrue;
			this.retParams[5] = bgMusicTrue;
			this.retParams[6] = randWormholeTrue;
			this.retParams[7] = hudTrue;
			this.retParams[8] = speedRunTrue;
			this.retParams[9] = initEnergy;
			this.retParams[10] = initSupplies;
			return true;
		}

		//alert(this.retParams);
	}

	function getInputMOMenu(e)
	{
		if(e.keyCode == 81)	//Q
		{
			menu(retParams);
			removeOptions();
		}
	}
}

function removeOptions()
{
	if(!document.getElementById("boardSizeInputX"))
		return;
	document.body.removeChild(boardSizeInputX);
	document.body.removeChild(boardSizeInputY);
	document.body.removeChild(startingPositionInputX);
	document.body.removeChild(startingPositionInputY);
	document.body.removeChild(startingEnergyInput);
	document.body.removeChild(startingSuppliesInput);
	document.body.removeChild(devOptionsCBox);
	document.body.removeChild(bgMusicCBox);
	document.body.removeChild(randWormholeCBox);
	document.body.removeChild(toggleHudCBox);
	document.body.removeChild(speedRunCBox);
	document.body.removeChild(submitOptionsButton);
	document.body.removeChild(bkgd);
	document.body.removeChild(startingPositionInputCaption);
	document.body.removeChild(boardSizeInputCaption);
	document.body.removeChild(devOptionsCBoxCaption);
	document.body.removeChild(toggleHudCBoxCaption);
	document.body.removeChild(speedRunModeCBoxCaption);
	document.body.removeChild(bgMusicCBoxCaption);
	document.body.removeChild(randWormholesCBoxCaption);
	document.body.removeChild(startingSuppliesEntryCaption);
	document.body.removeChild(startingEnergyEntryCaption);
}

function setDefaultParameters()
{
	defaults = [];
	defaults[0] = 128;
	defaults[1] = 128;
	defaults[2] = 0;
	defaults[3] = 0;
	defaults[4] = false;	//immortal
	defaults[5] = false;	//bgm
	defaults[6] = false;	//random wormhole
	defaults[7] = false;	//hud
	defaults[8] = false;	//speedrun
	defaults[9] = 1000; 	//energy
	defaults[10] = 1000;	//supplies

	return defaults;
}







