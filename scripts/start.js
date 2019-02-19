//start.js

//this is the first javascript function to be called

function start()
{
	this.gameOver = false;
	this.gameWon = false;
	this.displayHud = document.getElementById("hud").checked;
	this.speedRun = document.getElementById("speedrun").checked;

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

	    if(!this.gameOver)	//bug fix: eliminates double messages
	    {
	    	hitObstacle();	//check if rocket hits an obstacle after move. just experimental. far from perfect.
	    	//go to next frame (I think this is at 60 fps max(?))
	    }
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

		if(e.keyCode == '37')		//left arrow key
		{
			e.preventDefault();
			ship.rotateLeft();
		}

		else if(e.keyCode == '38')		//up
		{
			e.preventDefault();
			ship.increaseDistance();
		}

		else if(e.keyCode == '39')		//right
		{
			e.preventDefault();
			ship.rotateRight();
		}

		else if(e.keyCode == '40')		//down
		{
			e.preventDefault();
			ship.decreaseDistance();
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
	function hitObstacle()
	{
		for(i = 0; i < this.obstacles.length; i++){
			if((this.ship.cpx == this.obstacles[i].cpx) && (this.ship.cpy == this.obstacles[i].cpy) && !(this.ship.dev) && !(this.gameOver)){
				if(!this.gameOver)
				{
					this.ship.sprite.src = "img/animations/explosion/" + this.ship.animationFrame + ".gif";
				}
				this.gameOver = true;
				
				setTimeout(function()
				{
					alert("You hit an asteroid! Game over!");
					window.location.reload();	//changed to be a bit more clear than location = location
				}, 1000);
			}
		}
	}
	
	//experimental
	function getPotion()
	{		
		if((this.ship.cpx == this.potion.cpx) && (this.ship.cpy == this.potion.cpy)){
			this.ship.energy += this.potion.hp;
			if(this.ship.energy > this.ship.maxEnergy){
				this.ship.energy = this.ship.maxEnergy;
			}
			delete potion.x;
			delete potion.y;
			delete potion.cpx;
			delete potion.cpy;
		}
		
	}
	
	function win(){
		if((this.ship.cpx == this.recipe.cpx) && (this.ship.cpy == this.recipe.cpy)){
			if(!this.gameWon)
			{
				alert("You found the recipe! Congratulations! You win!");
				window.location.reload();	//changed to be a bit more clear than location = location
			}
			this.gameWon = true;
		}
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

		this.aRock = new Obstacle(1150, 1150, 9, 9);
		this.bRock = new Obstacle(1400, 1400, 11, 11);
		this.cRock = new Obstacle(800, 800, 6, 6);

		this.obstacles = new Array(aRock, bRock, cRock);

		//test energy potion
		this.potion = new EnergyPotion(1150, 1400, 9, 11, 200);

		//test recipe
		this.recipe = new Recipe(1400, 1150, 11, 9);
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
	    ctx.fillText("x = " + ship.x.toFixed(0) + " y = " + ship.y.toFixed(0), 10, 30);
	    ctx.fillText("current CP = " + ship.cpx + ", " + ship.cpy + " (x, y)", 10, 50);
	    ctx.fillStyle = "#00FF00";
	    ctx.fillText("energy = " + ship.energy.toFixed(0) + " / " + ship.maxEnergy.toFixed(0), 10, 70);
	    ctx.fillStyle = "#FF0000";
	    ctx.fillText("supplies = " + ship.supplies.toFixed(0) + " / " + ship.originalSupplies.toFixed(0), 10, 90);
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
	    drawItems(ctx);
	    drawShip(ctx);
	}

	//draws all obstacles (for now, just asteroids)
	function drawObstacles(ctx)
	{
		obstacles.forEach(function (rock)
	    {
	        if(confirmDraw(rock.x, rock.y))
	    	{
	    		ctx.drawImage(rock.sprite, rock.x - ship.x - GRID_SIZE/4, rock.y - ship.y - GRID_SIZE/4);
	    	}
	    });
  	}

  	//draws potions and recipe, etc
  	function drawItems(ctx)
  	{
	    //draw 1 potion
	    if(confirmDraw(this.potion.x, this.potion.y)){ ctx.drawImage(potion.sprite, 
	    	potion.x - ship.x - GRID_SIZE/4, potion.y - ship.y - GRID_SIZE/4); }

	    //draw recipe
	    if(confirmDraw(this.recipe.x, this.recipe.y)){ ctx.drawImage(recipe.sprite,
	    	recipe.x - ship.x - GRID_SIZE/4, recipe.y - ship.y - GRID_SIZE/4); }

	   	//draw potion if array of items?
	    //potion.forEach(function (p)
	    //{
	    //	if(confirmDraw(p.x, p.y))
	    //	{
	    //		ctx.drawImage(potion.sprite, p.x - ship.x, p.y - ship.y);
	    //	}
	    //});
	}

	//draws the user's ship
	function drawShip(ctx)
	{
		//rotate if ship isn't facing upward
	    ctx.rotate(ship.angle * Math.PI / 180);		//rotate the entire ctx/drawing object
	    if(this.gameOver)
	    {
	    	ctx.drawImage(ship.sprite, -SHIP_WIDTH/2 - GRID_SIZE/4, -SHIP_HEIGHT/2 - GRID_SIZE/4)
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

	    getPotion();
	    win();
	}


	function scan(){
		if(((Math.abs(this.recipe.x - this.ship.x)) <= (MAP_WIDTH*GRID_SIZE/2))&&((Math.abs(this.recipe.y - this.ship.y)) <= (MAP_HEIGHT*GRID_SIZE/2))){
			//this.recipe.hidden = 0;
			this.recipe.sprite.src = "img/recipe.png";
		}
		for(i = 0; i< this.obstacles.length; ++i){
			if(((Math.abs(this.obstacles[i].x - this.ship.x)) <= (MAP_WIDTH*GRID_SIZE/2))&&((Math.abs(this.obstacles[i].y - this.ship.y)) <= (MAP_HEIGHT*GRID_SIZE/2))){
				this.obstacles[i].visible = true;
				this.obstacles[i].sprite.src = "img/rock.png";
			}
		}
		if(((Math.abs(this.potion.x - this.ship.x)) <= (MAP_WIDTH*GRID_SIZE/2))&&((Math.abs(this.potion.y - this.ship.y)) <= (MAP_HEIGHT*GRID_SIZE/2))){
			//this.recipe.hidden = 0;
			this.potion.sprite.src = "img/energypotion.png";
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

	
