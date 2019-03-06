//abandonedfreighter.js

//Abandoned freighter class & functions

class AbandonedFreighter
{
	constructor(cpx, cpy, energy, supplies, currency)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;	
		this.energy = energy;
		this.supplies = supplies;
		this.currency = currency;
		
		this.sprite = new Image();
		this.addToMap = true;
		this.sprite.src = "img/abandoned freighter.png";
	}		
}