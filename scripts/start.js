//start.js

//this is the first javascript function to be called

var explosionSound;
var drawHeight = GAME_SCREEN_HEIGHT;

function start(presets)
{
	var resetHeight = true;

	//this.presets = presets;
	this.gameOver = false;
	this.gameWon = false;
	this.displayHud = false; //document.getElementById("hud").checked;
	this.speedRun = document.getElementById("speedrun").checked;
	//var explosionSound = new sound("explosion.mp3");

	//for debugging purposes
	this.numFrames = 0;
	this.fps = 0;
	this.startTime = (new Date()).getTime();
	this.commBox = new CommBox();
	this.musicPlayer = new MusicPlayer();

	initializeObjects();	//creates objects
	setUpEventListeners();	//creates event listeners, which hook up the
							//on-screen buttons with in-game functionality
	
	//this section handles user input
	document.onkeydown = getInput;

	//this function goes off several times per second
	function drawFrame()
	{
		//allows toggling of HUD
		if(document.getElementById("hud").checked == true)
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

		if(e.keyCode == '32')		//spacebar
		{
			e.preventDefault();		//prevents this from moving the window/canvas around
			ship.beginMoving();
			ship.commitMovement();
			pursuit();
		}

		if(e.keyCode == '37' || e.keyCode == '65')		//left arrow key
		{
			e.preventDefault();
			ship.rotateLeft();
		}

		else if(e.keyCode == '38' || e.keyCode == '87')		//up
		{
			e.preventDefault();
			ship.increaseDistance();
		}

		else if(e.keyCode == '39' || e.keyCode == '68')		//right
		{
			e.preventDefault();
			ship.rotateRight();
		}

		else if(e.keyCode == '40' || e.keyCode == '83')		//down
		{
			e.preventDefault();
			ship.decreaseDistance();
		}

		else if(e.keyCode == '72')				//H
		{
			toggleHud();
		}

		else if(e.keyCode == '81' || e.keyCode == '17')		//Q or CTRL
		{
			scan();
			ship.checkSupplies();
		}
		else if(e.keyCode == '90')							//Z
		{
			fireLaser();
			ship.checkEnergy();
		}
		else if (e.keyCode == '67') //C
		{
			ghost();
			ship.checkEnergy();
			ship.checkSupplies();
		}
		else if(e.keyCode == '88') //X
		{
			genesisSaber();
			ship.checkEnergy();
			ship.checkSupplies();
		}
		else if(e.keyCode == '86') //V
		{
			fugaDaemonum();
			ship.checkEnergy();
			ship.checkSupplies();
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
		//not optimized at all (will search every obstacle regardless of how far away it is)
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
				if(objName == "EnergyPotion")
				{
					commBox.drawNewBox(this.obstacles[i], true);
					i = getPotion(i);		
				}
				else if(objName == "Recipe" && !this.gameWon)
				{
					commBox.drawNewBox(this.obstacles[i], true);
					win();
				}
				else if((objName == "Asteroid") && !this.ship.dev)
				{
					commBox.drawNewBox(this.obstacles[i], true);
					hitObstacle();
				}
				else if(objName == "Xeon" || objName == "Celeron" || objName == "Ryzen")
				{
					commBox.drawNewBox(this.obstacles[i], true);
				}
				else if(objName == "DeathStar")
				{
					commBox.drawNewBox(this.obstacles[i], true);
					musicPlayer.playMusic("march.mp3");
				}
				else if(objName == "SpaceStation"){
					chanceGame(ship.offset_x,ship.offset_y, ship);
				}
				else if(objName == "AbandonedFreighter"){
					this.ship.damage = 0;
					commBox.drawNewBox(this.obstacles[i], true);
					i = getFreighter(i);
				}
				else if ((objName == "MeteorStorm") && !this.ship.dev){
					this.obstacles[i].tryMeteor(ship.offset_x,ship.offset_y, ship);
					commBox.drawNewBox(this.obstacles[i], true);
				}
				else if (objName == "Planet")
				{
					commBox.drawNewBox(this.obstacles[i], true);
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

	//needs refining
	function chanceGame(x,y){
		if(x + y == 0){
			var test = document.getElementById("wager");
			var test2 = document.getElementById("chanceGo");
			var canBet = true;
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
			if(wager > ship.currency || wager <= 0){
				commBox.drawNewBox("You don't have that much money! Enter another amount",true,5,560);
				canBet = false;
			}else if(guess > 10 || guess < 1){
				commBox.drawNewBox("A number between 1 and 10, no more and no less",true,5,560); 
				canBet = false;
			}else {
				commBox.drawNewBox("Enter a number of digital credits to bet",true,5,560);
			}
			var result = Math.floor((Math.random() * 10) + 1);
			if(!canBet){
				removeElement("chanceGo");
			}
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
		// testing save 
		initializeSavedGame();
		save();
		return index + 1;
	}

	function getFreighter(index){
		this.ship.energy = Math.min(this.ship.maxEnergy, this.ship.energy + this.obstacles[index].energy);
		this.ship.supplies = Math.min(this.ship.originalSupplies, this.ship.supplies + this.obstacles[index].supplies);
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
		this.ship = new Ship();
		this.target = new Target();

		this.obstacles = [];

		//BadMax NEEDS to be obstacles[0]
		//obstacles.push(new BadMax((Math.floor(Math.random() * MAP_MAX_X)+1),Math.floor(Math.random() * MAP_MAX_Y)+1));
		obstacles.push(new BadMax(0, 5));

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
			let randoms = generateRandomObstacles();
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

		obstacles.push(new DeathStar(Math.floor(Math.random() * 110) + 18, Math.floor(Math.random() * 110) + 18));
		obstacles.push(new Recipe(Math.floor(Math.random() * 110) + 18, Math.floor(Math.random() * 110) + 18));
		obstacles.push(new DeathStar(Math.floor(Math.random() * 10), Math.floor(Math.random() *10)));
		obstacles.push(new Recipe(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)));

		//There may only be one of each of the following:
		if(!isCeleron)
			obstacles.push(new Celeron(4, 4));
		if(!isXeon)
			obstacles.push(new Xeon(12, 12));
		if(!isRyzen)
			obstacles.push(new Ryzen(18, 18));

		// Initialize Boarder Wormholes
		for(var x = MAP_MIN_X - 1; x < MAP_MAX_X; x++){
			// Creates wormholes for the top and bottom rim of the boundary
			obstacles.push(new Wormhole(x, MAP_MIN_Y - 1));
			obstacles.push(new Wormhole(x, MAP_MAX_Y));
		}
		for(var y = MAP_MIN_Y; y < MAP_MAX_Y; y++){
			// Creates wormholes for left and right rim of the boundary
			obstacles.push(new Wormhole(MAP_MIN_X - 1, y));
			obstacles.push(new Wormhole(MAP_MAX_X, y));
		}


		this.BadMax = obstacles[0];

		ship.updatecp();
		
	}
	
	function setUpEventListeners()
	{	
		//be able to use buttons too
		document.getElementById("leftBtn").addEventListener("click", function()
		{
			ship.rotateLeft();
		});
		document.getElementById("rightBtn").addEventListener("click", function()
		{
			ship.rotateRight();
		});
		document.getElementById("upBtn").addEventListener("click", function()
		{
			ship.increaseDistance();
		});
		document.getElementById("downBtn").addEventListener("click", function()
		{
			ship.decreaseDistance();
		});
		document.getElementById("moveBtn").addEventListener("click", function()
		{
			ship.beginMoving();
			ship.commitMovement();
			pursuit();
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
	    ctx.fillText("supplies: " + ship.supplies.toFixed(0) + " / " + ship.originalSupplies.toFixed(0), 10, 80);
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
				else if(objName == "LaserBeam")
				{
					ctx.drawImage(obj.sprite, obj.x - ship.x - 4, obj.y - ship.y - 4);
					obj.x += obj.xv;
					obj.y += obj.yv;
					//ctx.drawImage(obj.sprite, obj.x - ship.x, obj.y - ship.y);
					//obj.x += obj.xv;
					//obj.y += obj.yv;
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
					ctx.rotate(obj.rotationAngle * Math.PI / 180);
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
		ship.supplies -= 50;
	}

	function fugaDaemonum(){
		var FD = new Audio('audio/fugadaemonum.wav');
		FD.volume = 1;
		FD.play();
		obstacles.push(new FugaDaemonum(ship.x -45, ship.y -90, 0));
		obstacles.push(new FugaDaemonum(ship.x -45, ship.y -90, 120));
		obstacles.push(new FugaDaemonum(ship.x -45, ship.y -90, 240));
		ship.energy -= 40;
		ship.supplies -= 20;
	}

	function scan(){
		if(this.scanner)
		{
			delete this.scanner;
		}
		this.scanner = new Scanner(320, 320);;
		//checks to see if obstacles are within half the screen distance from the ship
		setTimeout(function()
		{
			var foundSomething = false;
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
			ship.supplies -= (ship.originalSupplies * .02);
		}
	}
	function killBadMax()
	{
		delete obstacles[0];
		delete this.BadMax;
		obstacles[0] = new BadMax((Math.floor(Math.random() *GRID_SIZE)+1),Math.floor(Math.random() *GRID_SIZE)+1);
		//obstacles[0] = new BadMax(10*GRID_SIZE, 15*GRID_SIZE);
		this.BadMax = obstacles[0];
		// just testing save, will not want to call this here 
		//save();
		
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
			document.getElementById("timer").textContent = "Time: " + timelimit;
			timelimit--;
			if(timelimit < 0) {
				if(!this.gameOver){
					this.ship.sprite.src = "img/animations/explosion/" + this.ship.animationFrame + ".gif";
				}
				this.gameOver = true;
				setTimeout(function(){
					alert("You ran out of time! Game over!");
					window.location.reload();	
				}, 1000);
				clearInterval(downloadTimer);
			}
    			}, 1000);
		} 
	}
	function ghost(){
		this.ship.supplies -= 100;
		var timelimit = 15;
		var downloadTimer = setInterval(function(){
			this.ship.dev = true;
			this.ship.energyEfficiency = 1;
			this.ship.sprite.src = "img/ship2.png";	
			timelimit--;
			if(timelimit < 0){
				this.ship.sprite.src = "img/ship1.png";
				this.ship.dev = false;
				clearInterval(downloadTimer);
			}
			}, 1000);
		this.ship.dev = false;
	}

	//kicks it all off
	drawBackground("gameScreen");
	drawFrame();
	updateMap(obstacles);

	//For testing purposes:
	//speedRunMode();
	//ghost();
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

// saves game state to browser 
function save() {
	if (!supportsLocalStorage()) {
		  console.log("Browser does not support localStorage!");
		  return false; 
	}
	var savedState = prompt("Enter a name for this game.")
	localStorage.setItem(savedState, JSON.stringify(obstacles)); 
}
