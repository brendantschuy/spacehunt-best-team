function start()
{
	var cvs = document.getElementById("gameScreen");

	//load ship sprite
	var img1 = new Image();
	img1.src = "img/ship.png";


	//set size of canvas
	cvs.height = 480;
	cvs.width = 640;

	//the context of canvas is basically what's rendering it
	var ctx = cvs.getContext('2d');
	var x = cvs.width/2, y = cvs.height/2;

	ctx.fillStyle = "black";	
	ctx.fillRect(0, 0, 640, 480);

	//actually does the drawing
	function draw()
	{
  		ctx.drawImage(img1, x, y);		//centered at x, y

    	ctx.fillStyle = "RGBA(0, 0, 0, 0.4)";
    	ctx.fillRect(0, 0, cvs.width, cvs.height);

    	//go to next frame (I think this is at 60 fps max(?))
    	requestAnimationFrame(draw);

	}

	//this section handles user input
	document.onkeydown = getInput;

	function getInput(e)
	{
		if(e.keyCode == '37')		//left arrow key
		{
			x -= 5;
		}

		else if(e.keyCode == '38')		//down
		{
			y -= 5;
		}

		else if(e.keyCode == '39')		//right
		{
			x += 5;
		}

		else if(e.keyCode == '40')		//up
		{
			y += 5;
		}
	}

	//kicks it all off
	draw();
}