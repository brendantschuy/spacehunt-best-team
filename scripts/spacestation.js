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
		this.addToMap = true;
		this.hasCasino = (Math.floor(Math.random() * 2)) == 0 ? false : true;
		this.sprite.src = (this.hasCasino) ? "img/casino.png" : "img/space station.png";
	}		
}