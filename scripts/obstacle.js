//obstacle.js

//contains obstacle definition etc

class Asteroid
{
	constructor(x, y, cpx, cpy)
	{
		this.x = x;
		this.y = y;
		this.cpx = cpx;
		this.cpy = cpy;

		this.visible = false;
		this.onMapList = false;
		this.sprite = new Image();
		this.sprite.src = "img/rock.png";
	}
}