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
		this.x = ship.abs_x + Math.sin(Math.PI/180 * (ship.angle % 360)) * ship.distanceToTravel;
		this.y = ship.abs_y - Math.cos(Math.PI/180 * (ship.angle % 360)) * ship.distanceToTravel;
	}

}