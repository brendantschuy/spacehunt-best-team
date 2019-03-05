//wormhole.js

//contains wormhole definition

class Wormhole
{
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;

		this.visible = true;
		this.onMapList = true;
		this.sprite = new Image();
        this.sprite.src = "img/wormhole.png";
	}
}