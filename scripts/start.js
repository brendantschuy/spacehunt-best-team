//start.js

//this is the first javascript function to be called

var explosionSound;
var drawHeight = GAME_SCREEN_HEIGHT;

function start()
{
	var resetHeight = true;

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

	initializeObjects();	//creates objects
	setUpEventListeners();	//creates event listeners, which hook up the
							//on-screen buttons with in-game functionality

	//this section handles user input
	document.onkeydown = getInput;

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
		}
		else if(e.keyCode == '90')							//Z
		{
			fireLaser();
		}
		else if (e.keyCode == '67') //C
		{
			ghost();
		}
		else if(e.keyCode == '88') //X
		{
			genesisSaber();
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
					i = getPotion(i);		
				}
				else if(objName == "Recipe" && !this.gameWon)
				{
					commBox.drawNewBox(this.obstacles[i], true);
					win();
				}
				else if((objName == "Asteroid") && !this.ship.dev && (this.ship.isGhost == false))
				{
					commBox.drawNewBox(this.obstacles[i], true);
					hitObstacle();
				}
				else if(objName == "Xeon" || objName == "Celeron" || objName == "Ryzen" || objName == "DeathStar")
				{
					commBox.drawNewBox(this.obstacles[i], true);
				}
				else if(objName == "SpaceStation"){
					//also needs refining.
					chanceGame();
				}
				else if(objName == "AbandonedFreighter"){
					commBox.drawNewBox(this.obstacles[i], true);
					i = getFreighter(i);
				}
				else if ((objName == "MeteorStorm") && !this.ship.isGhost){
					this.obstacles[i].tryMeteor(ship.offset_x,ship.offset_y, ship);
					commBox.drawNewBox(this.obstacles[i], true);
				}
				else if (objName == "Planet")
				{
					commBox.drawNewBox(this.obstacles[i], true);
				}
				if((this.ship.cpx == this.BadMax.cpx) && (this.ship.cpy == this.BadMax.cpy) && this.ship.isGhost == false)
				{
					hitObstacle();
					commBox.drawNewBox(this.BadMax, true)
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
				}, 10000);
			}
			resetHeight = false;
		}
		else
		{
			drawHeight = GAME_SCREEN_HEIGHT	- GRID_SIZE;
		}
	}

	//needs refining
	function chanceGame(){		
		wager = prompt("Enter a number of digital credits to bet", 0);
		while(wager > ship.currency){
			wager = prompt("You cannot bet that much! Enter another amount", 0); 
		}
		guess = prompt("Enter a number between 1 and 10", 0);
		while(guess >= 10 || guess < 0){
			guess = prompt("Between 1 and 10, no more and no less", 0); 
		}
		var result = Math.floor((Math.random() * 10) + 1);
		if(guess == result){
			alert("Congratulations! You guessed the right number! You get 5x your wager!");
			ship.currency += (5 * wager);
		}
		if(guess == (result-1) || guess == (result+1)){
			alert("You were very close! Only within one. You get 3x your wager!");
			ship.currency += (3 * wager);
		}
		if(guess == (result -2) || guess == result(result + 2)){
			alert("Eh. Within two. Not bad. You get 1.5x your wager!");
			ship.currency += (1.5 * wager);
		else { 
			alert("Close, but not close enough. Sorry!");
			ship.currency -= wager;
		}	
	}

	function hitObstacle()
	{
		if(!this.gameOver && this.ship.isGhost == false)
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
	
	function win()
	{
		//play win sound
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
		return index + 1;
	}

	function getFreighter(index){
		this.ship.energy = Math.min(this.ship.maxEnergy, this.ship.energy + this.obstacles[index].energy);
		this.ship.supplies = Math.min(this.ship.originalSupplies, this.ship.supplies + this.obstacles[index].supplies);
		this.ship.currency += this.obstacles[index].currency;
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

		/* still working on this */
		// prompt user or wait for onload
		// if load, load(gameState, savedList);


		//Later, this will be turned into a loop for either a) random gen or b) load from file.
		obstacles.push(new BadMax((Math.floor(Math.random() *GRID_SIZE*GRID_SIZE)+1),Math.floor(Math.random() *GRID_SIZE*GRID_SIZE)+1));
		//obstacles.push(new BadMax(10*GRID_SIZE, 15*GRID_SIZE));
		obstacles.push(new Asteroid(9, 9));
		obstacles.push(new Asteroid(11, 11));
		obstacles.push(new Asteroid(6, 6));
		obstacles.push(new Asteroid(128, 128));
		obstacles.push(new Asteroid(64, 64));
		obstacles.push(new Asteroid(128, 0));
		obstacles.push(new Asteroid(0, 128));
		obstacles.push(new Asteroid(0, 0));
		obstacles.push(new Asteroid(1, 1));
		obstacles.push(new EnergyPotion(9, 11, 200));
		obstacles.push(new Recipe(11, 9));
		obstacles.push(new MeteorStorm(8,8));
		obstacles.push(new Celeron(4, 4));
		obstacles.push(new Xeon(12, 12));
		obstacles.push(new Ryzen(18, 18));
		obstacles.push(new DeathStar(15, 10));
		obstacles.push(new SpaceStation(13, 15));
		obstacles.push(new AbandonedFreighter(15, 17, 250, 300, 777));
		obstacles.push(new Planet(8, 8, 1));
		obstacles.push(new Planet(10, 8, 2));
		obstacles.push(new Planet(5, 10, 3));
		obstacles.push(new Planet(3, 18, 4));
		obstacles.push(new Planet(14, 14, 5));
		obstacles.push(new Planet(14, 10, 6));
		obstacles.push(new Planet(12, 10, 7));
		


	// 	save(gameState, savedList);

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

		ctx.font = "10px Arial";
	    ctx.beginPath();


	    //writes numbers/info to GUI
	    ctx.fillStyle = "#FFFFFF";
	    ctx.fillText("angle = " + ship.angle, 10, 10);
	    ctx.fillText("current CP = " + ship.cpx + ", " + ship.cpy + " (x, y)", 10, 30);
	    ctx.fillStyle = "#00FF00";
	    ctx.fillText("energy: " + ship.energy.toFixed(0) + " / " + ship.maxEnergy.toFixed(0), 10, 50);
	    ctx.fillStyle = "#FF0000";
	    ctx.fillText("supplies: " + ship.supplies.toFixed(0) + " / " + ship.originalSupplies.toFixed(0), 10, 70);
	    ctx.fillStyle = "#FFFF00";
	    ctx.fillText("currency: " + ship.currency.toFixed(0) + " digital credits", 10, 90);
	    ctx.fillStyle = "#FFFFFF";
	    ctx.fillText("distance to travel = " + ship.distanceToTravel.toFixed(0), 10, 110);
	    ctx.fillText("average fps = " + this.fps.toFixed(0), 10, 150);
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
	    	if(obj.visible)
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
		obstacles.push(new LaserBeam(ship.x	, ship.y -35, ship.angle));
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

	function scan(){
		//checks to see if obstacles are within half the screen distance from the ship
		for(i = 0; i< this.obstacles.length; ++i)
		{
			if(Math.abs(this.obstacles[i].cpx - this.ship.cpx) <= SCAN_RANGE &&(Math.abs(this.obstacles[i].cpy - this.ship.cpy)) <= SCAN_RANGE){
				this.obstacles[i].visible = true;
			}
		}

		//uses up supplies for scanning
		ship.supplies -= (ship.originalSupplies * .02);
		showMap(obstacles);
	}

	function pursuit()
	{
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
		this.BadMax.cpx = Math.floor(this.BadMax.x/GRID_SIZE);
		this.BadMax.cpy = Math.floor(this.BadMax.y/GRID_SIZE);
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
		var timelimit = 15;
		var downloadTimer = setInterval(function(){
			this.ship.ghostMode();
			this.ship.energyEfficiency = 1;
			this.ship.sprite.src = "img/ship2.png";	
			timelimit--;
			if(timelimit < 0){
				this.ship.sprite.src = "img/ship1.png";
				this.ship.isGhost = false;
				clearInterval(downloadTimer);
			}
			}, 1000);
		this.ship.ghostMode();
		this.ship.supplies -= 100;
	}

	//kicks it all off
	drawBackground("gameScreen");
	drawFrame();
	showMap(obstacles);

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
