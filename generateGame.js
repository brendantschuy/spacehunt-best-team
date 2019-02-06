function start()
{
	var cvs = document.getElementById("gameScreen");

	//ship parameters
	var speed = 5;

	//load ship sprite
	var img1 = new Image();
	img1.src = "img/ship.png";


	//set size of canvas
	cvs.height = 1280;
	cvs.width = 1280;

	var angle = 0;

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
		ctx.beginPath();
		ctx.strokeStyle = "white";
		for(w = 0; w < cvs.width; w += 128)
		{
			for(h = 0; h < cvs.height; h += 128)
			{
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
		ctx.beginPath();


    	ctx.fillStyle = "RGBA(0, 0, 0, 0.4)";
    	ctx.fillRect(0, 0, cvs.width, cvs.height);

    	ctx.fillStyle = "#FFFFFF";
    	ctx.fillText("angle = " + angle, 10, 10);
    	ctx.fillText("x = " + x.toFixed(1) + " y = " + y.toFixed(1), 10, 30);
    	ctx.fillText("current CP = " + cpx + ", " + cpy + " (x, y)", 10, 50);

    	createGrid();

    	ctx.save();

       	imgW = document.getElementById("pic").width;
    	imgH = document.getElementById("pic").height;
    	ctx.translate(x, y);
    	ctx.rotate(angle * Math.PI / 180);
    	ctx.drawImage(img1, -imgW/2, -imgH/2);		//centered at x, y

    	ctx.restore();


    	//go to next frame (I think this is at 60 fps max(?))
    	requestAnimationFrame(draw);

	}

	//this section handles user input
	document.onkeydown = getInput;

	function getInput(e)
	{
		if(e.keyCode == '37')		//left arrow key
		{
			angle = (angle - 30) % 360;
		}

		else if(e.keyCode == '38')		//up
		{
			x += Math.sin(Math.PI/180 * (angle % 360)) * speed;
			y -= Math.cos(Math.PI/180 * (angle % 360)) * speed;
			updatecp();
		}

		else if(e.keyCode == '39')		//right
		{
			angle = (angle + 30) % 360;
		}

		else if(e.keyCode == '40')		//down
		{

		}
	}

	function updatecp()
	{
		cpx = Math.floor(x / 128) + 1;
		cpy = Math.floor(y / 128) + 1;
	}

	//kicks it all off
	draw();
}