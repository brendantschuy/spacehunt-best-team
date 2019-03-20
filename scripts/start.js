//start.js

//this is the first javascript function to be called

var explosionSound;
var drawHeight = GAME_SCREEN_HEIGHT;
var levelThreeTime = 10;

function start(presets, params)
{
	setParameters(params);
	this.params = params;

	var resetHeight = true;

	//this.presets = presets;
	this.gameOver = false;
	this.gameWon = false;
	//this.displayHud = true; //document.getElementById("hud").checked;
	//this.speedRun = document.getElementById("speedrun").checked;
	//var explosionSound = new sound("explosion.mp3");

	//for debugging purposes
	this.numFrames = 0;
	this.fps = 0;
	this.startTime = (new Date()).getTime();
	this.commBox = new CommBox();
	this.musicPlayer = new MusicPlayer();

	initializeObjects();	//creates objects
	/*alert(this.obstacles.length);
	for(i = 1500; i < 1510; i++)
	{
		alert(obstacles[i].cpx + ", " + obstacles[i].cpy);
	}*/
	setUpEventListeners();	//creates event listeners, which hook up the
							//on-screen buttons with in-game functionality
	
	//this section handles user input
	document.onkeydown = getInput;

	function setParameters(params)
	{
		this.map_max_x = params[0];
		this.map_max_y = params[1];
		this.starting_x = params[2];
		this.starting_y = params[3];

		//alert(this.starting_x + ", " + this.starting_y);
		//params[4] (immortality) is handled in initializeObjects()
		if(params[5] == true)
		{
			backgroundMusic();
		}
		//params[6] (randWormholes) is handled in initializeObjects()
		this.displayHud = params[7];
		this.speedRun = params[8];
	}

	//this function goes off several times per second
	function drawFrame()
	{
		//allows toggling of HUD
		if(this.displayHud)
		{
			writeHud();
		}
		//if(this.speedRun){ //if this is called every tinme a frame is drawn the user will just be spammed with prompts
		//	speedRunMode();
		//}

	    drawBackground("gameScreen");	//creates background and white grid
		drawTarget();		//draws red target indicating where ship will travel to
	    drawThings("gameScreen");   	//draws things: ship, items, obstacles...

	    interact();	//check if we hit anything
	    requestAnimationFrame(drawFrame);		
	    
	}

	//handles user input
	function getInput(e)
	{
		switch(e.keyCode)
		{
			case 32 : //spacebar
				e.preventDefault();		//prevents this from moving the window/canvas around
				ship.beginMoving();
				ship.commitMovement();
				resetMoves();
				pursuit();
				break;
			case 37 : case 65 : //<left> or <a>
				e.preventDefault();
				ship.rotateLeft();
				break;
			case 38 : case 87 : //<up> or <w>
				e.preventDefault();
				ship.increaseDistance();
				break;
			case 39 : case 68 : //<right> or <d>
				e.preventDefault();
				ship.rotateRight();
				break;
			case 40 : case 83 : //<down> or <s>
				e.preventDefault();
				ship.decreaseDistance();
				break;
			case 72 : //<h>
				toggleHud();
				break;
			case 81 : case 17 : //<q> or <ctrl>
				scan();
				ship.checkSupplies();
				break;
			case 90 : //<z>
				fireLaser();
				ship.checkEnergy();
				break;
			case 67 : //<c>
				ghost();
				ship.checkEnergy();
				ship.checkSupplies();
				break;
			case 88 : //<x>
				genesisSaber();
				ship.checkEnergy();
				ship.checkSupplies();
				break;
			case 86 : //<z>
				fugaDaemonum();
				ship.checkEnergy();
				ship.checkSupplies();
				break;
			case 80 : //<p>
				//if(levelThreeTime == 0){
					levelThree();
					ship.checkEnergy();
					break;
				//}
				//break;
			default: 
				break;
		}
	}

	//draws grid corresponding with CPs
	function drawBackground(elementID)
	{
		var ctx = document.getElementById(elementID).getContext('2d');

		//creates backdrop (opacity = 0.4 so it is see-through)
	    ctx.fillStyle = "RGBA(0, 0, 25, 0.4)";
	    ctx.fillRect(0, 0, GAME_SCREEN_WIDTH, drawHeight);

	    ctx.beginPath();    //reduces lag       
	    ctx.strokeStyle = "white";
	    for(w = ship.offset_x; w < GAME_SCREEN_WIDTH; w += GRID_SIZE)
	    {
	        for(h = ship.offset_y; h < drawHeight; h += GRID_SIZE)
	        {
	            //draws line every 128 px in either direction
	            ctx.moveTo(w, 0.5);
	            ctx.lineTo(w, drawHeight);
	            ctx.stroke();
	            ctx.moveTo(0.5, h);
	            ctx.lineTo(GAME_SCREEN_WIDTH, h);
	            ctx.stroke();
	        }
	    }
	    ctx.closePath();

	    this.numFrames++;	//for use in FPS calculation
	}

	//only draws things if they're in the vicinity of the ship
	function confirmDraw(x, y)
	{
		return(x > (ship.x - GRID_SIZE * 2.5) && (x < ship.x + GRID_SIZE * 2.5) && 
			(y > ship.y - GRID_SIZE * 2.5) && (y < ship.y + GRID_SIZE * 2.5));
	}

	//draws target (spot where ship will end up)
	function drawTarget()
	{
		ctx.strokeStyle="red";
		
		target.setTarget(ship);
		ctx.beginPath();
		ctx.moveTo(SHIP_ABS_X, SHIP_ABS_Y);
		ctx.lineTo(target.x, target.y);
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(target.x, target.y, 10, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.stroke();

		if(this.scanner)
		{
			ctx.moveTo(0, 0);
			ctx.beginPath();
			ctx.fillStyle = "white";
			ctx.strokeStyle = "white";
			//alert(scanner.x, scanner.y);
			ctx.arc(scanner.x, scanner.y, scanner.radius, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
	}

	//work in progress.
	function interact()
	{
		var toggleBox = false;
		for(var i = 0; i < this.obstacles.length; i++)
		{
			if((this.ship.cpx == this.obstacles[i].cpx) && (this.ship.cpy == this.obstacles[i].cpy))	
			{
				drawHeight -= Math.abs(ship.offset_y);
				if(drawHeight <= GAME_SCREEN_HEIGHT	- GRID_SIZE)
				{
					drawHeight = GAME_SCREEN_HEIGHT - GRID_SIZE;
				}
				objName = this.obstacles[i].constructor.name;
				switch(objName)
				{
					case "EnergyPotion" :
						commBox.drawNewBox(this.obstacles[i], true);
						i = getPotion(i);	
						break;
					case "Recipe" :
						commBox.drawNewBox(this.obstacles[i], true);
						win();
						break;
					case "Asteroid" :
						if(!this.ship.dev){
							commBox.drawNewBox(this.obstacles[i], true);
							hitObstacle();
						}
						break;
					case "Xeon" : case "Celeron" : case "Ryzen" : case "Planet" :
						commBox.drawNewBox(this.obstacles[i], true);
						break;
					case "DeathStar" : 
						commBox.drawNewBox(this.obstacles[i], true);
						musicPlayer.playMusic("march.mp3");
						break;
					case "SpaceStation" :
						if(this.obstacles[i].hasCasino){
							chanceGame(ship.offset_x,ship.offset_y, ship);
						}else{
							//if((ship.damage > 0 || ship.energy < ship.maxEnergy || ship.supplies < ship.originalSupplies) && ship.currency >= 100){
							if(ship.offset_x + ship.offset_y == 0){
								/*if(ship.supplies < ship.originalSupplies && ship.currency >= 10){
									//ship.damage = 0;
									//this.ship.energy = Math.min(this.ship.maxEnergy, this.ship.energy + 100);
									this.ship.currency -= 10;
									commBox.drawNewBox("You have paid 10 to dock and refill your supplies!",true,5,560);
									this.ship.supplies = Math.min(this.ship.originalSupplies, this.ship.supplies + 100);*/
								if(ship.currency >= 10){
									this.ship.currency -= 10;
									this.ship.supplies = 100;
									commBox.drawNewBox("You have paid 10 to dock and refill your supplies!",true,5,560);
								}else if(ship.currency < 10){
									commBox.drawNewBox("You don't have enough money to dock!",true,5,560);
								}
							}
							//commBox.drawNewBox(this.obstacles[i], true);
						}
						
						break;
					case "AbandonedFreighter" :
						this.ship.damage = 0;
						commBox.drawNewBox(this.obstacles[i], true);
						i = getFreighter(i);
						break;
					case "MeteorStorm" :
						if(!this.ship.dev){
							this.obstacles[i].tryMeteor(ship.offset_x,ship.offset_y, ship);
							commBox.drawNewBox(this.obstacles[i], true);
						}
						break;
					case "Wormhole" :
						commBox.drawNewBox(this.obstacles[i], true);
						hitWormhole();
						break;
					default : break;
				}
				toggleBox = true;
			}
		}

		if(!toggleBox)
		{
			if(resetHeight)
			{
				setTimeout(function()
				{
					drawHeight = GAME_SCREEN_HEIGHT;
					resetHeight = true;
					commBox.toggle = false;
				}, 3500);
			}
			resetHeight = false;
		}
		else
		{
			drawHeight = GAME_SCREEN_HEIGHT	- GRID_SIZE;
		}
	}

	function chanceGame(x,y){
		if(x + y == 0){
			var test = document.getElementById("wager");
			var test2 = document.getElementById("chanceGo");
			var canBet = false;
	  		if(!test){
				var box1 = document.createElement("input");
				box1.type = "text";
				//box1.value = "wager";
	    		box1.id = "wager";
	    		box1.placeholder="Enter amount to Wager";
		      	document.getElementById("game").appendChild(box1);
		      	var box2 = document.createElement("input");
				box2.type = "text";
				//box2.value = 0;
	    		box2.id = "guess";
	    		box2.placeholder="Enter Guess (1 to 10)";
		      	document.getElementById("game").appendChild(box2);
		    }
		    if(!test2){
		      	var box3 = document.createElement("input");
		      	box3.type = "button";
				box3.value = "GO";
				box3.onclick =function(){playChanceGame(document.getElementById('guess').value,document.getElementById('wager').value,Math.floor((Math.random() * 10) + 1));};
	    		box3.id = "chanceGo";
		      	document.getElementById("game").appendChild(box3);
		    }		
			wager = document.getElementById("wager").value;
			guess = document.getElementById("guess").value;
			//if(!commBox.toggle){
				if(wager.length > 0 && (wager > ship.currency || wager <= 0)){
					commBox.drawNewBox("You don't have that much money! Enter another amount",true,5,560);
					canBet = false;
				}else if(guess.length > 0 && (guess > 10 || guess < 1)){
					commBox.drawNewBox("A number between 1 and 10, no more and no less",true,5,560); 
					canBet = false;
				}else {
					if(wager.length > 0 && guess.length > 0) {
						canBet = true;
					}
					commBox.drawNewBox("Enter a number of digital credits to bet",true,5,560);
				}
			//}
			//var result = Math.floor((Math.random() * 10) + 1);
			if(!canBet){
				removeElement("chanceGo");
			}
			//updateURL();
		}else {
			removeElement("wager");
			removeElement("guess");
			removeElement("chanceGo");
		}	
	}

	function playChanceGame(guess,wager,result){
		if(guess == result){
			commBox.drawNewBox("Congratulations! You guessed the right number! You get 3x your wager!",true,5,560);
			alert("Congratulations! You guessed the right number! You get 3x your wager!");
			ship.currency += (3 * wager);
		}else if(guess == (result-1) || guess == (result+1)){
			commBox.drawNewBox("You were very close! Only within one. You get 1.5x your wager!",true,5,560);
			alert("You were very close! Only within one. You get 1.5x your wager!");
			ship.currency += (1.5 * wager);
		}else { 
			commBox.drawNewBox("Not close at all. You lose.",true,5,560);
			alert("Not close at all. You lose.");
			ship.currency -= wager;
		}
	}

	function hitObstacle()
	{
		if(!this.gameOver)
		{
			this.ship.sprite.src = "img/animations/explosion/" + this.ship.animationFrame + ".gif";
			var audio_explosion = new Audio('audio/explosion.mp3');
			audio_explosion.volume = 0.5; 	//less loud
			audio_explosion.play();
		}
		this.gameOver = true;

		setTimeout(function()
		{
			window.location.reload();	//changed to be a bit more clear than location = location
		}, 1000);
	}

	function hitWormhole()
	{
		if(this.ship.randWormholes == true){
			this.ship.y = (Math.floor(Math.random() * (map_max_x + 1))) * GRID_SIZE;
			this.ship.x = (Math.floor(Math.random() * (map_max_y + 1))) * GRID_SIZE;
		}
		else{
			this.ship.y = Math.floor(map_max_y/2) * GRID_SIZE;
			this.ship.x = Math.floor(map_max_x/2) * GRID_SIZE;
		}

		this.ship.cpx = Math.floor((this.ship.x - SHIP_WIDTH) / GRID_SIZE) + 1;
		this.ship.cpy = Math.floor((this.ship.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
		this.ship.restoreDefaults();

		var audio_wormhole = new Audio('audio/wormhole.wav');
		audio_wormhole.volume = 1;
		audio_wormhole.play();
	}
	
	function hitBadmax()
	{
		
		killBadMax();
		var chance = (Math.floor(Math.random() * 3));
		if(chance == 0){
			commBox.drawNewBox("BAD MAX SHOT YOU DOWN!",true,5,560);
			musicPlayer.playMusic("badmax_kill_player.wav");
			hitObstacle();
		}
		if(chance == 1){
			this.ship.supplies /= 2;
			this.ship.energy /= 2;
			commBox.drawNewBox("BadMax stole half of your energy and supplies.",true,5,560);
		}
		if(chance == 2){
			commBox.drawNewBox("You successfully fended off BadMax for now.",true,5,560);
		}
	}
	
	function win()
	{
		//play win sound
		musicPlayer.playMusic("find_recipe.wav");
		setTimeout(function()
		{
			window.location.reload();
		}, 1000);
	}

	//experimental
	function getPotion(index)
	{	
		var audio_potion = new Audio('audio/potion.wav');
		audio_potion.volume = 1;
		audio_potion.play();
		this.ship.energy = Math.min(this.ship.maxEnergy, this.ship.energy + this.obstacles[index].hp);
		this.obstacles.splice(index, 1);	//deletes 1 array member @ index 
		this.ship.damage = 0;
		return index + 1;
	}

	function getFreighter(index){
		this.ship.energy = Math.min(this.ship.maxEnergy, this.ship.energy + this.obstacles[index].energy);
		/*this.ship.supplies = Math.min(this.ship.originalSupplies, this.ship.supplies + this.obstacles[index].supplies);*/
		this.ship.supplies = 100;
		this.ship.currency += this.obstacles[index].currency;
		this.ship.damage = 0;
		this.obstacles.splice(index, 1);

		return index + 1;
	}

	function initializeObjects()
	{

		//create canvas, get context
		var cvs = createCanvas();
		this.ctx = cvs.getContext('2d');

		//create ship
		this.ship = new Ship(starting_x, starting_y);
		ship.dev = this.params[4];
		ship.randWormholes = this.params[6];
		ship.energy = parseInt(this.params[9]);	
		ship.maxEnergy = parseInt(ship.energy);
		ship.supplies = parseInt(this.params[10]);
		/*ship.originalSupplies = parseInt(ship.supplies);*/
		this.target = new Target();

		this.obstacles = [];

		//BadMax NEEDS to be obstacles[0]
		obstacles.push(new BadMax((Math.floor(Math.random() * map_max_x)+1),Math.floor(Math.random() * map_max_y)+1));
		obstacles.push(new Planet(1, 0, 2));
		obstacles[1].planetName = "Alderaan";
		//obstacles.push(new BadMax(0, 5));

		//There may only be one!
		let isXeon = false, isCeleron = false, isRyzen = false;

		if(presets.length >= 1)
		{
			presets.forEach(function(presetItem)
			{
				if(presetItem.constructor.name == "Xeon")
				{
					if(isXeon) return;
					isXeon = true;
				}
				if(presetItem.constructor.name == "Celeron")
				{
					if(isCeleron) return;
					isCeleron = true;
				}
				if(presetItem.constructor.name == "Ryzen")
				{
					if(isRyzen) return;
					isRyzen = true;
				}
				//alert("Preset item: " + presetItem.constructor.name);
				obstacles.push(presetItem);
				//alert(presetItem.x + ", " + presetItem.y);
				//obstacles.push(new Asteroid(presetItem.x, presetItem.y));
			});
		}
		else
		{
			let randoms = generateRandomObstacles(map_max_x, map_max_y);
			randoms.forEach(function(randomItem)
			{
				if(randomItem.constructor.name == "Xeon")
				{
					if(isXeon) return;
					isXeon = true;
				}
				if(randomItem.constructor.name == "Celeron")
				{
					if(isCeleron) return;
					isCeleron = true;
				}
				if(randomItem.constructor.name == "Ryzen")
				{
					if(isRyzen) return;
					isRyzen = true;
				}
				//alert("Preset item: " + presetItem.constructor.name);
				obstacles.push(randomItem);
				//alert(presetItem.x + ", " + presetItem.y);
				//obstacles.push(new Asteroid(presetItem.x, presetItem.y));
			});
		}

		obstacles.push(new DeathStar(Math.floor(Math.random() * 0.9 * map_max_x + 0.1 * map_max_x), Math.floor(Math.random() * 0.9 * map_max_y + 0.1 * map_max_y)));
		obstacles.push(new Recipe(Math.floor(Math.random() * 0.9 * map_max_x + 0.1 * map_max_x), Math.floor(Math.random() * 0.9 * map_max_y + 0.1 * map_max_y)));
		obstacles.push(new DeathStar(Math.floor(Math.random() * 0.1 * map_max_x), Math.floor(Math.random() * 0.1 * map_max_y)));
		//obstacles.push(new Recipe(Math.floor(Math.random() * 0.1 * map_max_x), Math.floor(Math.random() * 0.1 * map_max_y)));

		//There may only be one of each of the following:
		if(!isCeleron)
			obstacles.push(new Celeron(4, 4));
		if(!isXeon)
			obstacles.push(new Xeon(12, 12));
		if(!isRyzen)
			obstacles.push(new Ryzen(18, 18));

		// Initialize Boarder Wormholes
		for(var x = MAP_MIN_X - 1; x <= map_max_x; x++){
			// Creates wormholes for the top and bottom rim of the boundary
			obstacles.push(new Wormhole(x, MAP_MIN_Y - 1));
			obstacles.push(new Wormhole(x, map_max_y));
		}
		for(var y = MAP_MIN_Y; y < map_max_y; y++){
			// Creates wormholes for left and right rim of the boundary
			obstacles.push(new Wormhole(MAP_MIN_X - 1, y));
			obstacles.push(new Wormhole(map_max_x, y));
		}

		// Initialize other wormholes
		obstacles.push(new Wormhole(1, 5));
		obstacles.push(new Wormhole(10, 7));
		obstacles.push(new Wormhole(7, 2));


		this.BadMax = obstacles[0];

		ship.updatecp();
	}
	
	function setUpEventListeners()
	{	
		//be able to use buttons too
		document.getElementById("leftBtn").addEventListener("click", function()
		{
			//ship.rotateLeft();
			ship.faceLeft();
		});
		document.getElementById("rightBtn").addEventListener("click", function()
		{
			//ship.rotateRight();
			ship.faceRight();
		});
		document.getElementById("upBtn").addEventListener("click", function()
		{
			//ship.increaseDistance();
			ship.faceUp();
		});
		document.getElementById("downBtn").addEventListener("click", function()
		{
			//ship.decreaseDistance();
			ship.faceDown();
		});
		document.getElementById("moveBtn").addEventListener("click", function()
		{
			ship.beginMoving();
			ship.commitMovement();
			pursuit();
		});
		// This should change the value in the drop down move menu to the value of spaces from 
		// the key board
		document.getElementById("spaces").addEventListener("change", function() 
		{
			if(Math.floor(ship.distanceToTravel/GRID_SIZE) > 10) {
				ship.distanceToTravel = 10 * GRID_SIZE;
			}
			var spaces = document.getElementById("spaces");
			spaces.value = Math.floor(ship.distanceToTravel/GRID_SIZE);
		});
		document.getElementById("devMode").addEventListener("click", function()
		{
			ship.toggleDevMode();
		});
		document.getElementById("randWormholes").addEventListener("click", function()
		{
			ship.toggleRandWormholesMode();
		});
		document.getElementById("scan").addEventListener("click", function()
		{
			scan();
			//recipe.hidden = 0;
			//recipe.sprite.src = "img/recipe.png";
		});
		document.getElementById("save").addEventListener("click", function()
		{
			initializeSavedGame();
		});
		document.getElementById("OTBBtn").addEventListener("click", function() {
			fireLaser();
		});
		document.getElementById("GSBtn").addEventListener("click", function() {
			genesisSaber();
		});
		document.getElementById("FDBtn").addEventListener("click", function() {
			fugaDaemonum();
		});
		document.getElementById("hud").addEventListener("click", function()
		{
			toggleHud();
		});
		document.getElementById("speedrun").addEventListener("click", function()
		{
			toggleSpeedRun();
		});
		document.getElementById("bgmusic").addEventListener("click", function()
		{
			backgroundMusic();
		});
	}

	function backgroundMusic(){
		document.getElementById("bgmusic").innerHTML = '<iframe src="audio/bgm.mp3" allow="autoplay" id="audio" style="display:none"></iframe>';
	}


	//writes to top left of screen (Hud == heads up display)
	function writeHud(ctx)
	{
		this.fps = (numFrames + 1)/(((new Date()).getTime() - this.startTime)/1000);
	
		var ctx = document.getElementById("gameScreen").getContext('2d');

		ctx.font = "20px Arial";
	    ctx.beginPath();


	    //writes numbers/info to GUI
	    ctx.fillStyle = "#FFFFFF";
	    //ctx.fillText("angle = " + ship.angle, 10, 20);
	    ctx.fillText("current CP = " + ship.cpx + ", " + ship.cpy + " (x, y)", 10, 40);
	    ctx.fillStyle = "#00FF00";
	    ctx.fillText("energy: " + ship.energy.toFixed(0) + " / " + ship.maxEnergy.toFixed(0), 10, 60);
	    ctx.fillStyle = "#FF0000";
		/*ctx.fillText("supplies: " + ship.supplies.toFixed(0) + " / " + ship.originalSupplies.toFixed(0), 10, 80);*/
		ctx.fillText("supplies: " + ship.supplies.toFixed(0) + "%", 10, 80);
	    ctx.fillStyle = "#FFFF00";
	    ctx.fillText("currency: " + ship.currency.toFixed(0) + " digital credits", 10, 100);
	    ctx.fillStyle = "#FFFFFF";
	    ctx.fillText("distance to travel: " + ship.distanceToTravel.toFixed(0), 10, 120);
	    ctx.fillText("damage: " + ship.damage.toFixed(0) + "%", 10, 160);
	    //ctx.fillText("average fps = " + this.fps.toFixed(0), 10, 180);
	}

	//draws obstacles, ship, other items on the canvas
	function drawThings(elementID)
	{
		var ctx = document.getElementById(elementID).getContext('2d');
		ctx.beginPath();
		ctx.save();
	    ctx.translate(SHIP_ABS_X, SHIP_ABS_Y);				//place center of rotation at current center of ship

	    drawObstacles(ctx);
	    drawShip(ctx);
	    if(this.scanner)
	    {
	    	scanner.increaseSize();
	    }
	    if(commBox.toggle)
	    {
	    	commBox.drawBox();
	    }
	}

	//draws all obstacles (for now, just asteroids)
	function drawObstacles(ctx)
	{
		obstacles.forEach(function (obj)
	    {
	    	if(Math.abs(obj.y - ship.y) > GAME_SCREEN_HEIGHT || Math.abs(obj.x - ship.x) > GAME_SCREEN_WIDTH)
	    	{
	    		return;
	    	}

	    	else if(obj.visible)
	    	{
	    		objName = obj.constructor.name;

	    		if(objName == "Planet" || objName == "Xeon" || objName == "Ryzen" || objName == "Celeron" || objName == "DeathStar" || objName == "SpaceStation")
	    		{
	    			if(obj.y - ship.y <= drawHeight)
	    			{
	    				ctx.drawImage(obj.sprite, obj.x - ship.x, obj.y - ship.y);
	    			}
	    		}
				else if(objName == "BadMax")
				{
					ctx.drawImage(obj.sprite, (obj.x - ship.x - GRID_SIZE/2)-1, (obj.y - ship.y - GRID_SIZE/2)-1);
				}
				else if(objName == "BikeSkeleton"){
					ctx.drawImage(obj.sprite, (obj.x - ship.x - GRID_SIZE/2)-1, (obj.y - ship.y - GRID_SIZE/2)-1);
				}					
				else if(objName == "LaserBeam")
				{
					ctx.drawImage(obj.sprite, obj.x - ship.x - 4, obj.y - ship.y - 4);
					obj.x += obj.xv;
					obj.y += obj.yv;
				}
				else if(objName =="GenesisSaber"){
					ctx.drawImage(obj.sprite, obj.x - ship.x - 4, obj.y - ship.y - 4);
					obj.x += obj.xv;
					obj.y += obj.yv;
				}	
				else if(objName =="FugaDaemonum"){
					//something else here to make sure the images are drawn correctly.
					//Not complete yet.
					ctx.drawImage(obj.sprite, obj.x - ship.x - 4, obj.y - ship.y - 4);
					//ctx.rotate(obj.rotationAngle * Math.PI / 180);
					obj.x += obj.xv;
					obj.y += obj.yv;
				}	
	    		else
	    		{
	    			ctx.drawImage(obj.sprite, obj.x - ship.x - GRID_SIZE/4, obj.y - ship.y - GRID_SIZE/4);
	    		}
	    	}
	    }, this);
  	}
	
	//draws the user's ship
	function drawShip(ctx)
	{
		//rotate if ship isn't facing upward
	    ctx.rotate(ship.angle * Math.PI / 180);

	    if(this.gameOver)
	    {
	    	ctx.drawImage(ship.sprite, -SHIP_WIDTH/2 - GRID_SIZE/4, -SHIP_HEIGHT/2 - GRID_SIZE/4);
	    }
	    else
	    {
	    	ctx.drawImage(ship.sprite, -SHIP_WIDTH/2, -SHIP_HEIGHT/2);		//centered at x, y
	    }
   
	    //go back to original ctx
	    ctx.restore();
	    ctx.save();

		ctx.translate(SHIP_ABS_X, SHIP_ABS_Y);	
	    ship.projectiles.forEach(function(laser)
	    {
	    	ctx.save();
	    	ctx.rotate(laser.angle * Math.PI/90);

	    	//Why yes, this is extremely hacky
	    	if(laser.angle % 180 == 0)
	    	{
	    		ctx.rotate(Math.PI/2);
	    		laser.x += laser.yv;
	    	}
	    	else
	    	{
	    		laser.x -= laser.xv;
    			laser.y += laser.yv;
	    	}

	    	if(laser.angle < 100)
	    	{
	    		ctx.drawImage(laser.sprite, laser.x - ship.x - GAME_SCREEN_HEIGHT * 1.5, laser.y - ship.y);
	    	}
	    	else
	    	{
    			ctx.drawImage(laser.sprite, laser.x - ship.x, laser.y - ship.y);
    		}
    		ctx.restore();
    	}, this);

    	ctx.restore();

	    ship.updatecp();

	    if(this.gameOver)
	    {
	    	this.ship.sprite.src = "img/animations/explosion/" + this.ship.animationFrame + ".gif";
			//explosionSound.play();
	    	if(this.ship.animationFrame == 16)
	    	{
	    		this.ship.sprite.src = "";
	    	}
	    	else
	    	{
	    		this.ship.animationFrame = (this.ship.animationFrame + 1);
	    	}
	    }
		
		if(this.ship.dev && (this.ship.cpy == this.BadMax.cpy) && (this.ship.cpx == this.BadMax.cpx)){
			killBadMax();
		}

	    if(ship.isMoving == true)
	    {
	    	ctx.beginPath();
	    	ship.commitMovement();
	    }
	}

	function fireLaser()
	{
		var OverloadThunderBeam = new Audio('audio/overload_thunder_beam.wav');
		OverloadThunderBeam.volume = 1;
		OverloadThunderBeam.play();
		ship.projectiles.push(new LaserBeam(ship.x	, ship.y -35, ship.angle));
		ship.energy -= 2;
		var count = checkLaser();
	}
	//I've implemented this checkLaser the most basic and ugly way possible I think
	function checkLaser(){
		var count = 0;
		var maxDist = 10; //this is furthest CP distance from the ship that can be broken by the laser.
		if(this.ship.angle == 90){
			for(var i = 0; i<this.obstacles.length; ++i){
				if((this.ship.x<=this.obstacles[i].x) && (this.ship.cpy == this.obstacles[i].cpy) && (Math.abs(this.ship.cpx - this.obstacles[i].cpx) <= maxDist)){
					count += spliceObj(i);
				}
			}
		}
		if(this.ship.angle == 0){
			for(var i = 0; i<this.obstacles.length; ++i){
				if((this.ship.x==this.obstacles[i].x) && (this.ship.cpy>=this.obstacles[i].cpy) && (Math.abs(this.ship.cpy - this.obstacles[i].cpy) <= maxDist)){
					count += spliceObj(i);
				}
			}
		}
		if(this.ship.angle == 270){
			for(var i = 0; i<this.obstacles.length; ++i){
				if((this.ship.x>=this.obstacles[i].x) && (this.ship.cpy == this.obstacles[i].cpy) && (Math.abs(this.ship.cpx - this.obstacles[i].cpx) <= maxDist)){
					count += spliceObj(i);
				}
			}
		}
		if(this.ship.angle == 180){
			for(var i = 0; i<this.obstacles.length; ++i){
				if((this.ship.x==this.obstacles[i].x) && (this.ship.cpy <= this.obstacles[i].cpy) && (Math.abs(this.ship.cpy - this.obstacles[i].cpy) <= maxDist)){
					count += spliceObj(i);
				}
			}
		}
		return count;
	}
	

	function spliceObj(ID){
		let j = Math.floor(Math.random() * 10);
		if(j % 10 == 0)
		{
			this.obstacles.push(new Recipe(this.obstacles[ID].cpx, this.obstacles[ID].cpy));
		}
		this.obstacles.splice(ID,1);
		return 1;
	}
	

	function genesisSaber()
	{
		var GS = new Audio('audio/genesis_saber.wav');
		GS.volume = 1;
		GS.play();
		obstacles.push(new GenesisSaber(ship.x -45, ship.y -90, 0));
		obstacles.push(new GenesisSaber(ship.x -45, ship.y -90, 45));
		obstacles.push(new GenesisSaber(ship.x -45, ship.y -90, 90));
		obstacles.push(new GenesisSaber(ship.x -45, ship.y -90, 135));
		obstacles.push(new GenesisSaber(ship.x -45, ship.y -90, 180));
		obstacles.push(new GenesisSaber(ship.x -45, ship.y -90, 225));
		obstacles.push(new GenesisSaber(ship.x -45, ship.y -90, 270));
		obstacles.push(new GenesisSaber(ship.x -45, ship.y -90, 315));
		
		ship.energy -= 100;
		/*ship.supplies -= 50;*/
		ship.supplies -= 8;
	}

	function fugaDaemonum(){
		var FD = new Audio('audio/fugadaemonum.wav');
		FD.volume = 1;
		FD.play();
		obstacles.push(new FugaDaemonum(ship.x -45, ship.y -90, 0));
		obstacles.push(new FugaDaemonum(ship.x -45, ship.y -90, 120));
		obstacles.push(new FugaDaemonum(ship.x -45, ship.y -90, 240));
		ship.energy -= 40;
		/*ship.supplies -= 20;*/
		ship.supplies -= 4;
	}

	function scan(){
		var foundSomething = false;

		if(this.scanner)
		{
			delete this.scanner;
		}
		this.scanner = new Scanner(320, 320);;
		//checks to see if obstacles are within half the screen distance from the ship
		setTimeout(function()
		{
			//var foundSomething = false;
			for(i = 0; i< this.obstacles.length; ++i)
			{
				if(Math.abs(this.obstacles[i].cpx - this.ship.cpx) <= SCAN_RANGE &&(Math.abs(this.obstacles[i].cpy - this.ship.cpy)) <= SCAN_RANGE){
					if(this.obstacles[i].visible == false){
						foundSomething = true;
					}
					this.obstacles[i].visible = true;
				}
			}
			updateMap(obstacles);
		}, 200);
		

		//uses up supplies for scanning
		if(foundSomething) {
			/*ship.supplies -= Math.floor(ship.originalSupplies * .02);*/
			ship.supplies -= ship.supplies * 0.02;
		}
	}
	function killBadMax()
	{
		delete obstacles[0];
		delete this.BadMax;
		obstacles[0] = new BadMax((Math.floor(Math.random() *GRID_SIZE)+1),Math.floor(Math.random() *GRID_SIZE)+1);
		//obstacles[0] = new BadMax(10*GRID_SIZE, 15*GRID_SIZE);
		this.BadMax = obstacles[0];
		
	}

	function pursuit()
	{
		distx = this.BadMax.cpx - this.ship.cpx;
		disty = this.BadMax.cpy - this.ship.cpy;
		
		absDist = Math.sqrt((distx * distx) + (disty * disty));
		
		if(absDist < 30){
			if(Math.abs(distx) > Math.abs(disty)){
				if(distx < 0)
					this.BadMax.x += GRID_SIZE;
				else if(distx>0)
					this.BadMax.x -= GRID_SIZE;
			}
			else{
				if(disty < 0)
					this.BadMax.y += GRID_SIZE;
				else if(disty > 0)
					this.BadMax.y -= GRID_SIZE;
			}
		}
		else if (absDist >= 30){
			if(this.ship.cpx < this.BadMax.cpx){
				this.BadMax.x -= GRID_SIZE;
			}
			else if(this.ship.cpx > this.BadMax.cpx){
				this.BadMax.x += GRID_SIZE;
			}
			if(this.ship.cpy < this.BadMax.cpy){
				this.BadMax.y -= GRID_SIZE;		
			}
			else if(this.ship.cpy > this.BadMax.cpy){
				this.BadMax.y += GRID_SIZE;
			}
		}
		this.BadMax.cpx = Math.floor(this.BadMax.x/GRID_SIZE);
		this.BadMax.cpy = Math.floor(this.BadMax.y/GRID_SIZE);
		
		if((this.ship.cpx == this.BadMax.cpx) && (this.ship.cpy == this.BadMax.cpy) && !this.ship.dev){
			hitBadmax();
		}
		
		//boolean check statement isn't working for some reason.
		//not sure why. I tried using an int and an == and no luck.
		//var check = false;
		if(Math.abs(this.ship.cpx - this.BadMax.cpx) <= 2 && Math.abs(this.ship.cpy - this.BadMax.cpy) <=2){
			musicPlayer.playMusic("badmax.wav");
		}

	}

	//displays HUD on game screen
	function toggleHud()
	{
		this.displayHud = !(this.displayHud);
	}
	
	//speed run has a hard time limit to complete the game
	function toggleSpeedRun(){ 
		this.speedRun = !(this.speedRun);
		if(this.speedRun) speedRunMode();
	}

	//describes and implements speed run mode
	function speedRunMode(){
		var confirmStart = confirm("You will enter speed run mode. Is this okay?");
		if(confirmStart == true){
			document.getElementById("bgmusic").innerHTML = '<iframe src="audio/speedrun.mp3" allow="autoplay" id="audio" style="display:none"></iframe>';
			var timelimit = 10;
			var downloadTimer = setInterval(function(){
			document.getElementById("timer").textContent = 	"Time: " + timelimit;
			timelimit--;
			if(timelimit < 0) {
				if(!this.gameOver){
					this.ship.sprite.src = "img/animations/explosion/" + this.ship.animationFrame + ".gif";
				}
				this.gameOver = true;
				setTimeout(function(){
					alert("YOU RAN OUT OF TIME! GAME OVER!");
					window.location.reload();	
				}, 1000);
				clearInterval(downloadTimer);
			}
    			}, 1000);
		} 
	}

	function ghost(){
		/*this.ship.supplies -= 100;*/
		this.ship.supplies -= 10;
		var timelimit = 15;
		var downloadTimer = setInterval(function(){
			this.ship.dev = true;
			this.ship.energyEfficiency = 1;
			this.ship.sprite.src = "img/ship2.png";	
			timelimit--;
			if(timelimit < 0){
				this.ship.sprite.src = "img/ship1.png";
				this.ship.energyEfficiency = 10;
				this.ship.dev = false;
				clearInterval(downloadTimer);
			}
			}, 1000);
		this.ship.energyEfficiency = 10;
		this.ship.dev = false;
	}

	//weird name to prevent xenoblade spoilers
	function levelThree(){
		var three = new Audio('audio/levelthree.wav');
		three.volume = 1;
		three.play();
		this.ship.energy -= 500;
		/*this.ship.supplies -= 350;*/
		this.ship.supplies -= 14;
		var timelimit = 30;
		var downloadTimer = setInterval(function(){
			//document.getElementById("timer").textContent = 	"Artifices online for " + timelimit + " seconds";
			this.ship.dev = true;
			this.ship.energyEfficiency = 0;
			SHIP_SPEED = 12;
			this.ship.damage = 0;
			this.ship.sprite.src = "img/ship3.png";	
			timelimit--;
			if(timelimit < 0){
				this.ship.sprite.src = "img/ship1.png";
				this.ship.energyEfficiency = 10;
				this.ship.dev = false;
				SHIP_SPEED = GRID_SIZE / 32;
				clearInterval(downloadTimer);
			}
			}, 1000);
		this.ship.energyEfficiency = 10;
		this.ship.dev = false;
	}

	//kicks it all off
	drawBackground("gameScreen");
	drawFrame();
	updateMap(obstacles);

	//For testing purposes:
	//speedRunMode();
	//ghost();

	//ProgressCountdown(levelThreeTime, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => alert(`Page has started: ${value}.`));

}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
  	}
  	this.stop = function(){
    		this.sound.pause();
  	}
}

function moveTarget() {
	var spaces = document.getElementById("spaces");
	ship.distanceToTravel = spaces.value * GRID_SIZE;
	this.drawTarget();
}

function resetMoves() {
	document.getElementById("spaces").value = "0";
}

function changeLocation() {
	var str = document.getElementById("newLocation").value;
	var coordinates = str.split(",", 2);
	
	if(coordinates.length != 2){
		document.getElementById("newLocation").value = "Invalid Entry";
		return;
	}

	var x = Math.floor(Number(coordinates[0]));
	var y = Math.floor(Number(coordinates[1]));

	if(isNaN(x) || isNaN(y)){
		document.getElementById("newLocation").value = "Invalid Entry";
	} else{
		if(x > MAP_MAX_X || x < MAP_MIN_X){
			document.getElementById("newLocation").value = "x out of range";
		} else if(y > MAP_MAX_Y || y < MAP_MIN_Y){
			document.getElementById("newLocation").value = "y out of range";
		} else{
			ship.cpx = x;
			ship.cpy = y;
			ship.x = x * GRID_SIZE;
			ship.y = y * GRID_SIZE;
			document.getElementById("newLocation").value = "";
		}
	}
}

function changeEnergy() {
	var str = document.getElementById("newEnergy").value;
	var num = Math.floor(Number(str));

	if(!isNaN(num)){
		if((num < 1001) && (num > -1)){
			ship.energy = num;
			document.getElementById("newEnergy").value = "";
			ship.checkEnergy();
		} else{
			document.getElementById("newEnergy").value = "Out of range";
		}
	} else{
		document.getElementById("newEnergy").value = "Invalid Entry";
	}
}

function changeSupplies() {
	var str = document.getElementById("newSupplies").value;
	var num = Math.floor(Number(str));

	if(!isNaN(num)){
		if((num < 101) && (num > -1)){
			ship.supplies = num;
			document.getElementById("newSupplies").value = "";
			ship.checkSupplies();
		} else{
			document.getElementById("newSupplies").value = "Out of range";
		}
	} else{
		document.getElementById("newSupplies").value = "Invalid Entry";
	}
}

function changeCurrency() {
	var str = document.getElementById("newCurrency").value;
	var num = Math.floor(Number(str));

	if(!isNaN(num)){
		if((num < 1000000) && (num > -1)){
			ship.currency = num;
			document.getElementById("newCurrency").value = "";
		} else{
			document.getElementById("newCurrency").value = "Out of range";
		}
	} else{
		document.getElementById("newCurrency").value = "Invalid Entry";
	}
}

function changeDamage() {
	var str = document.getElementById("newDamage").value;
	var num = Math.floor(Number(str));

	if(!isNaN(num)){
		if((num < 101) && (num > -1)){
			ship.damage = num;
			document.getElementById("newDamage").value = "";
		} else{
			document.getElementById("newDamage").value = "Out of range";
		}
	} else{
		document.getElementById("newDamage").value = "Invalid Entry";
	}
}

function updateURL(){
	var str = String(ship.cpx) + "," + String(ship.cpy);
	document.getElementById("location").value = str;

	document.getElementById("energy").value = Math.floor(ship.energy);
	document.getElementById("supplies").value = Math.floor(ship.supplies);
	document.getElementById("currency").value = Math.floor(ship.currency);
	document.getElementById("damage").value = Math.floor(ship.damage);
}

function displayDevOptions(){
	var changeVar = document.getElementById("user-controls");
	var devModes = document.getElementById("dev-modes");

	if (changeVar.style.display === "none"){
		changeVar.style.display = "inline-block";
		devModes.style.display = "block";
	} else {
		changeVar.style.display = "none";
		devModes.style.display = "none";
	}
}

function ProgressCountdown(timeleft, bar, text) {
  return new Promise((resolve, reject) => {
    var countdownTimer = setInterval(() => {
      timeleft--;

      document.getElementById(bar).value = timeleft;
      document.getElementById(text).textContent = timeleft;

      if (timeleft <= 0) {
	levelThreeTime = 0;
        clearInterval(countdownTimer);
        resolve(true);
      }
    }, 1000);
  });
}
