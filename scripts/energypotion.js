//energypotion.js

//contains energy potion definition etc

class EnergyPotion
{
	constructor(x, y, cpx, cpy)
	{
		this.x = x;
		this.y = y;
		this.cpx = cpx;
		this.cpy = cpy;

		this.sprite = new Image();
		this.sprite.src = "img/energypotion.png";
	}		
}