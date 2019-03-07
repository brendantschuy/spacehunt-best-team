//target.js

//where will the ship end up after jumping?

class Target
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	setTarget(ship)
	{
		this.x = SHIP_ABS_X + Math.sin(Math.PI/180 * (ship.angle % 360)) * ship.distanceToTravel;
		this.y = SHIP_ABS_Y - Math.cos(Math.PI/180 * (ship.angle % 360)) * ship.distanceToTravel;
	}

}

class Scanner
{
	constructor(x, y)
	{
		this.x = x + 22;
		this.y = y + 22;
		this.radius = 0;
	}

	increaseSize()
	{
		this.radius += 7;
		//this.x -= 1;
		//this.y -= 1;
	}
}