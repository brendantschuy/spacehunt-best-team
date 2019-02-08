//start.js

//this is the first javascript function to be called

function start()
{
	//create canvas, get context
	var cvs = createCanvas();
	this.ctx = cvs.getContext('2d');

	//create ship
	this.ship = new Ship();

	this.aRock = new Obstacle(1150, 1150);
	this.bRock = new Obstacle(1400, 1400);
	this.cRock = new Obstacle(800, 800);

	this.obstacles = new Array(aRock, bRock, cRock);

	ship.updatecp();

	//this section handles user input
	document.onkeydown = getInput;

	//be able to use buttons too
	document.getElementById("leftBtn").addEventListener("click", ship.rotateLeft());
	document.getElementById("rightBtn").addEventListener("click", ship.rotateRight());
	document.getElementById("upBtn").addEventListener("click", ship.increaseDistance());
	document.getElementById("downBtn").addEventListener("click", ship.decreaseDistance());
	document.getElementById("moveBtn").addEventListener("click", ship.commitMovement());

	function draw()
	{
	    var ctx = document.getElementById("gameScreen").getContext('2d');
	    //var img1 = document.getElementById("pic");
	    //var rockPic = document.getElementById("rock");
	    var imgW = 88;//img1.width;
	    var imgH = 65;//img1.height;
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
	    ctx.fillText("energy = " + ship.energy.toFixed(1), 10, 70);
	    ctx.fillText("distance to travel = " + ship.distanceToTravel, 10, 90);

	    //creates white grid everywhere
	    createGrid();

	    //to enable rotation save current ctx
	    ctx.save();


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

	    //rotate if ship isn't facing upward
	    ctx.rotate(ship.angle * Math.PI / 180);		//rotate the entire ctx/drawing object
	    ctx.drawImage(ship.sprite, -SHIP_WIDTH/2, -SHIP_HEIGHT/2);		//centered at x, y

	    //go back to original ctx
	    ctx.restore();


	    //go to next frame (I think this is at 60 fps max(?))
	    requestAnimationFrame(draw);

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
		if(x > (ship.x - GRID_SIZE * 2.5) && (x < ship.x + GRID_SIZE * 2.5) && (y > ship.y - GRID_SIZE * 2.5) && (y < ship.y + GRID_SIZE * 2.5))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	//kicks it all off
	draw();
}