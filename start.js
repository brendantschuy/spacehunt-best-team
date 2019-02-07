//start.js

//this is the first javascript function to be called

function start()
{
	//create canvas, get context
	var cvs = createCanvas();
	this.ctx = cvs.getContext('2d');

	//create ship
	this.ship = new Ship();

	ship.updatecp();

	//this section handles user input
	document.onkeydown = getInput;

	function draw()
	{
	    var ctx = document.getElementById("gameScreen").getContext('2d');
	    var img1 = document.getElementById("pic");
	    var imgW = img1.width;
	    var imgH = img1.height;
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


	    ctx.translate(ship.x, ship.y);						//place center of rotation at current center of ship
	    ctx.rotate(ship.angle * Math.PI / 180);			//rotate the entire ctx/drawing object
	    ctx.drawImage(img1, -imgW/2, -imgH/2);		//centered at x, y

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
			ship.angle = (ship.angle - ANGLE_INCREMENT) % 360;
			if(ship.angle < 0)
			{
				ship.angle = 360 + ship.angle;	//angle should never be negative
			}
		}

		else if(e.keyCode == '38')		//up
		{
			ship.distanceToTravel += ship.speed;
		}

		else if(e.keyCode == '39')		//right
		{
			ship.angle = (ship.angle + ANGLE_INCREMENT) % 360;
		}

		else if(e.keyCode == '40')		//down
		{
			ship.distanceToTravel -= ship.speed;
			if(ship.distanceToTravel < 0)
			{
				ship.distanceToTravel = 0;
			}
		}
	}

	//kicks it all off
	draw();
}