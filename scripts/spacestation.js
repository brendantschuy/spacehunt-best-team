//spacestation.js

//Space station class & functions

class SpaceStation
{
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;	

		this.sprite = new Image();
		this.onMapList = false;
		this.sprite.src = "img/spacestation.png";
	}		
}