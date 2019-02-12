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