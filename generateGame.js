function start()
{
	var cvs = document.getElementById("gameScreen");

	//set size of canvas
	cvs.height = 1280;
	cvs.width = 1280;


	//ship parameters
	var speed = 5;
	var energy = 1000;
	var angle = 0;
	var distanceToTravel = 0;


	//load ship sprite
	var img1 = new Image();
	img1.src = "img/ship.png";


	//the context of canvas is basically what's rendering it
	var ctx = cvs.getContext('2d');
	var x = cvs.width/2, y = cvs.height/2;
	var cpx, cpy;
	updatecp();

	ctx.fillStyle = "black";	
	ctx.fillRect(0, 0, 640, 480);


	//draws grid corresponding with CPs
	function createGrid()
	{
		ctx.beginPath();	//reduces lag
		ctx.strokeStyle = "white";
		for(w = 0; w < cvs.width; w += 128)
		{
			for(h = 0; h < cvs.height; h += 128)
			{
				//draws line every 128 px in either direction
				ctx.moveTo(w, 0);
				ctx.lineTo(w, cvs.height);
				ctx.stroke();
				ctx.moveTo(0, h);
				ctx.lineTo(cvs.width, h);
				ctx.stroke();
			}
		}
		ctx.closePath();
	}

	createGrid();

	//actually does the drawing
	function draw()
	{
		//helps reduce lag
		ctx.beginPath();

		//creates backdrop (opacity = 0.4 so it is see-through)
    	ctx.fillStyle = "RGBA(0, 0, 0, 0.4)";
    	ctx.fillRect(0, 0, cvs.width, cvs.height);

    	//writes numbers/info to GUI
    	ctx.fillStyle = "#FFFFFF";
    	ctx.fillText("angle = " + angle, 10, 10);
    	ctx.fillText("x = " + x.toFixed(1) + " y = " + y.toFixed(1), 10, 30);
    	ctx.fillText("current CP = " + cpx + ", " + cpy + " (x, y)", 10, 50);
    	ctx.fillText("energy = " + energy, 10, 70);
    	ctx.fillText("distance to travel = " + distanceToTravel, 10, 90);

    	//creates white grid everywhere
    	createGrid();

    	//to enable rotation save current ctx
    	ctx.save();

       	imgW = document.getElementById("pic").width;
    	imgH = document.getElementById("pic").height;
    	ctx.translate(x, y);						//place center of rotation at current center of ship
    	ctx.rotate(angle * Math.PI / 180);			//rotate the entire ctx/drawing object
    	ctx.drawImage(img1, -imgW/2, -imgH/2);		//centered at x, y

    	//go back to original ctx
    	ctx.restore();


    	//go to next frame (I think this is at 60 fps max(?))
    	requestAnimationFrame(draw);

	}

	//this section handles user input
	document.onkeydown = getInput;

	function getInput(e)
	{
		if(e.keyCode == '32')		//spacebar
		{
			commitMovement(distanceToTravel);
		}

		if(e.keyCode == '37')		//left arrow key
		{
			angle = (angle - 90) % 360;
			if(angle < 0)
			{
				angle = 360 + angle;	//angle should never be negative
			}
		}

		else if(e.keyCode == '38')		//up
		{
			distanceToTravel += 10;
		}

		else if(e.keyCode == '39')		//right
		{
			angle = (angle + 90) % 360;
		}

		else if(e.keyCode == '40')		//down
		{
			distanceToTravel -= 10;
		}
	}

	//obstacles etc would just correspond with some CP
	function updatecp()
	{
		cpx = Math.floor(x / 128) + 1;
		cpy = Math.floor(y / 128) + 1;
	}

	//actually moves ship
	function commitMovement(distanceToTravel)
	{
		x += Math.sin(Math.PI/180 * (angle % 360)) * distanceToTravel;
		y -= Math.cos(Math.PI/180 * (angle % 360)) * distanceToTravel;
		updatecp();
		energy -= 5 * distanceToTravel;
	}

	//kicks it all off
	draw();
}