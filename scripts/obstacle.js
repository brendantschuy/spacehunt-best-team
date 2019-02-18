//obstacle.js

//contains obstacle definition etc

class Obstacle
{
	constructor(x, y, cpx, cpy)
	{
		this.x = x;
		this.y = y;
		this.cpx = cpx;
		this.cpy = cpy;

		var visible = false;
		this.sprite = new Image();
		//this.sprite.src = "img/rock.png";
	}
}