//start.js

//this is the first javascript function to be called

function start()
{
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

	//this section handles user input
	document.onkeydown = getInput;

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
			ship.commitMovement();
		});
	document.getElementById("devMode").addEventListener("click", function()
		{
			ship.toggleDevMode();
		});

	function draw()
	{
	    var ctx = document.getElementById("gameScreen").getContext('2d');

	    //helps reduce lag
	    ctx.beginPath();

	    //creates backdrop (opacity = 0.4 so it is see-through)
	    ctx.fillStyle = "RGBA(0, 0, 0, 0.4)";
	    ctx.fillRect(0, 0, GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);

	    //writes numbers/info to GUI
	    ctx.fillStyle = "#FFFFFF";
	    ctx.fillText("angle = " + ship.angle, 10, 10);
	    ctx.fillText("x = " + ship.x.toFixed(1) + " y = " + ship.y.toFixed(1), 10, 30);
	    ctx.fillText("current CP = " + ship.cpx + ", " + ship.cpy + " (x, y)", 10, 50);
	    ctx.fillStyle = "#00FF00";
	    ctx.fillText("energy = " + ship.energy.toFixed(1) + " / " + ship.maxEnergy.toFixed(1), 10, 70);
	    ctx.fillStyle = "#FF0000";
	    ctx.fillText("supplies = " + ship.supplies.toFixed(1) + " / " + ship.originalSupplies.toFixed(1), 10, 90);
	    ctx.fillStyle = "#FFFFFF";
	    ctx.fillText("distance to travel = " + ship.distanceToTravel, 10, 110);

	    //creates white grid everywhere
	    createGrid();

	    //to enable rotation save current ctx
	    ctx.save();

		drawTarget();
	    //draws ship
	    ctx.translate(ship.abs_x, ship.abs_y);				//place center of rotation at current center of ship

	    //draw obstacles
	    obstacles.forEach(function (rock)
	    {
	        if(confirmDraw(rock.x, rock.y))
	    	{
	    		ctx.drawImage(aRock.sprite, rock.x - ship.x, rock.y - ship.y);
	    	}
	    });
  
	    //draw 1 potion
	    if(confirmDraw(this.potion.x, this.potion.y)){ ctx.drawImage(potion.sprite, potion.x - ship.x, potion.y - ship.y); }

	    //draw recipe
	    if(confirmDraw(this.recipe.x, this.recipe.y)){ ctx.drawImage(recipe.sprite, recipe.x - ship.x, recipe.y - ship.y); }

	    //draw potion if array of items?
	    //potion.forEach(function (p)
	    //{
	    //	if(confirmDraw(p.x, p.y))
	    //	{
	    //		ctx.drawImage(potion.sprite, p.x - ship.x, p.y - ship.y);
	    //	}
	    //});
	    
	    //rotate if ship isn't facing upward
	    ctx.rotate(ship.angle * Math.PI / 180);		//rotate the entire ctx/drawing object
	    ctx.drawImage(ship.sprite, -SHIP_WIDTH/2, -SHIP_HEIGHT/2);		//centered at x, y

	    	    
	    //go back to original ctx
	    ctx.restore();


	    //go to next frame (I think this is at 60 fps max(?))
	    requestAnimationFrame(draw);

		
	    //check if rocket hits an obstacle after move. just experimental. far from perfect.
	    hitObstacle();
	    getPotion();		

	}


	function getInput(e)
	{
		if(e.keyCode == '32')		//spacebar
		{
			ship.commitMovement();
		}

		if(e.keyCode == '37')		//left arrow key
		{
			ship.rotateLeft();
		}

		else if(e.keyCode == '38')		//up
		{
			ship.increaseDistance();
		}

		else if(e.keyCode == '39')		//right
		{
			ship.rotateRight();
		}

		else if(e.keyCode == '40')		//down
		{
			ship.decreaseDistance();
		}
	}

	function confirmDraw(x, y)
	{
		return(x > (ship.x - GRID_SIZE * 2.5) && (x < ship.x + GRID_SIZE * 2.5) && (y > ship.y - GRID_SIZE * 2.5) && (y < ship.y + GRID_SIZE * 2.5));
	}

	//draws target (spot where ship will end up)
	function drawTarget()
	{
		ctx.strokeStyle="red";
		
		target.setTarget(ship);
		ctx.beginPath();
		ctx.moveTo(ship.abs_x, ship.abs_y);
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
			if((this.ship.cpx == this.obstacles[i].cpx) && (this.ship.cpy == this.obstacles[i].cpy)){
				alert("You hit an asteroid! Game over!");
				location = location;
			}
		}
	}
	
	//experimental
	function getPotion()
	{
		//if array (not tested / working yet)
		//for(i = 0; i < this.potionArray.length; i++){
		//	if((this.ship.cpx == this.potionArray[i].cpx) && (this.ship.cpy == this.potionArray[i].cpy)){
		
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

	//kicks it all off
	draw();

}