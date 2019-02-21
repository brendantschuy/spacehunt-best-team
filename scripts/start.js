//start.js

//this is the first javascript function to be called

var explosionSound;

function start()
{
	this.gameOver = false;
	this.gameWon = false;
	this.displayHud = false; //document.getElementById("hud").checked;
	this.speedRun = document.getElementById("speedrun").checked;
	//var explosionSound = new sound("explosion.mp3");

	//for debugging purposes
	this.numFrames = 0;
	this.fps = 0;
	this.startTime = (new Date()).getTime();

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
		//	SpeedRunMode();
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
	}

	//draws grid corresponding with CPs
	function drawBackground(elementID)
	{
		var ctx = document.getElementById(elementID).getContext('2d');

		//creates backdrop (opacity = 0.4 so it is see-through)
	    ctx.fillStyle = "RGBA(0, 0, 0, 0.4)";
	    ctx.fillRect(0, 0, GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);

	    ctx.beginPath();    //reduces lag       
	    ctx.strokeStyle = "white";
	    for(w = ship.offset_x; w < GAME_SCREEN_WIDTH; w += GRID_SIZE)
	    {
	        for(h = ship.offset_y; h < GAME_SCREEN_HEIGHT; h += GRID_SIZE)
	        {
	            //draws line every 128 px in either direction
	            ctx.moveTo(w, 0.5);
	            ctx.lineTo(w, GAME_SCREEN_WIDTH);
	            ctx.stroke();
	            ctx.moveTo(0.5, h);
	            ctx.lineTo(GAME_SCREEN_HEIGHT, h);
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
		//not optimized at all (will search every obstacle regardless of how far away it is)
		for(var i = 0; i < this.obstacles.length; i++)
		{
			if((this.ship.cpx == this.obstacles[i].cpx) && (this.ship.cpy == this.obstacles[i].cpy))	
			{
				objName = this.obstacles[i].constructor.name;
				if(objName == "EnergyPotion")
				{
					i = getPotion(i);		
				}
				else if(objName == "Recipe" && !this.gameWon)
				{
					drawCommBox("recipe");
					win();
				}
				else if((objName == "Asteroid" || objName == "Planet") && !this.ship.dev)
				{
					drawCommBox("asteroid");
					hitObstacle();
				}
				else if(objName == "Xeon" || objName == "Celeron" || objName == "Ryzen")
				{
					drawCommBox(objName);
				}
			}
		}
	}

	function hitObstacle()
	{
		if(!this.gameOver)
		{
			this.ship.sprite.src = "img/animations/explosion/" + this.ship.animationFrame + ".gif";
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
		this.ship.energy = Math.min(this.ship.maxEnergy, this.ship.energy + this.obstacles[index].hp);
		this.obstacles.splice(index, 1);	//deletes 1 array member @ index 
		return index + 1;
	}

	function initializeObjects()
	{
		// check for saved state. if it exists, load state. else, continue with new game

		//create canvas, get context
		var cvs = createCanvas();
		this.ctx = cvs.getContext('2d');

		//create ship
		this.ship = new Ship();
		this.target = new Target();

		this.obstacles = new Array();

		//Later, this will be turned into a loop for either a) random gen or b) load from file.
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
		obstacles.push(new Celeron(4, 4));
		obstacles.push(new Xeon(12, 12));
		obstacles.push(new Ryzen(18, 18));
		obstacles.push(new DeathStar(2, 13));

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
	    //helps reduce lag
	    ctx.beginPath();


	    //writes numbers/info to GUI
	    ctx.fillStyle = "#FFFFFF";
	    ctx.fillText("angle = " + ship.angle, 10, 10);
	    ctx.fillText("current CP = " + ship.cpx + ", " + ship.cpy + " (x, y)", 10, 30);
	    ctx.fillStyle = "#00FF00";
	    ctx.fillText("energy = " + ship.energy.toFixed(0) + " / " + ship.maxEnergy.toFixed(0), 10, 50);
	    ctx.fillStyle = "#FF0000";
	    ctx.fillText("supplies = " + ship.supplies.toFixed(0) + " / " + ship.originalSupplies.toFixed(0), 10, 70);
	    ctx.fillStyle = "#FFFFFF";
	    ctx.fillText("distance to travel = " + ship.distanceToTravel.toFixed(0), 10, 90);
	    ctx.fillText("average fps = " + this.fps.toFixed(0), 10, 110);
	}

	//draws obstacles, ship, other items on the canvas
	function drawThings(elementID)
	{
		var ctx = document.getElementById(elementID).getContext('2d');
		ctx.beginPath();
		ctx.save();
	    ctx.translate(SHIP_ABS_X, SHIP_ABS_Y);				//place center of rotation at current center of ship

	    drawObstacles(ctx);
	    //drawItems(ctx);
	    drawShip(ctx);
	}

	//draws all obstacles (for now, just asteroids)
	function drawObstacles(ctx)
	{
		obstacles.forEach(function (obj)
	    {
	    	if(obj.visible)
	    	{
	    		ctx.drawImage(obj.sprite, obj.x - ship.x - GRID_SIZE/4, obj.y - ship.y - GRID_SIZE/4);
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


	function scan(){
		//checks to see if obstacles are within half the screen distance from the ship
		for(i = 0; i< this.obstacles.length; ++i)
		{
			if(Math.abs(this.obstacles[i].cpx - this.ship.cpx) <= SCAN_RANGE &&(Math.abs(this.obstacles[i].cpy - this.ship.cpy)) <= SCAN_RANGE){
				this.obstacles[i].visible = true;
			}
		}
		ship.supplies -= (ship.originalSupplies * .02);
		showMap(obstacles);
	}

	function toggleHud()
	{
		this.displayHud = !(this.displayHud);
	}
	
	function toggleSpeedRun(){ 
		this.speedRun = !(this.speedRun);
		if(this.speedRun) SpeedRunMode();
	}
	function SpeedRunMode(){
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

	//kicks it all off
	drawBackground("gameScreen");
	drawFrame();
	showMap(obstacles);
	//For testing purposes
	//SpeedRunMode();
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

//Displays messages to player
function drawCommBox(obstacleName)
{
	var ctx = document.getElementById("gameScreen").getContext('2d');
	ctx.fillStyle = "white";
	ctx.fillRect(0, 512, 640, 128);
	ctx.fillStyle = "black";
	ctx.font = "20px Arial";
	switch(obstacleName)
	{
		case("asteroid") : 
			ctx.fillText("You hit an asteroid. Game over.", 20, 560);
			break;
		case("Xeon") : case ("Celeron") : case("Ryzen") : 
			ctx.fillText("Welcome to the planet of " + obstacleName + "!", 20, 560);
			//ctx.fillText("Press L to land or O to orbit (not implemented).", 20, 590);
			break;
		case("recipe") : 
			ctx.fillText("You win the game :)", 20, 560);
			break;
		case("DeathStar") : 
			ctx.fillText("Resistance is futile. Wait, wrong universe.");
			break;
	}
}

	
