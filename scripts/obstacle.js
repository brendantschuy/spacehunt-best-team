//asteroid.js

//contains asteroid definition etc

class Asteroid
{
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;

		this.visible = false;
		this.onMapList = false;
		this.sprite = new Image();
		this.sprite.src = "img/rock.png";
	}
}