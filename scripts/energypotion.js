//energypotion.js

//contains energy potion definition etc

class EnergyPotion
{
	constructor(cpx, cpy, hp)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;
		this.hp = hp;		//potion restores this much HP/energy	

		this.sprite = new Image();
		this.addToMap = true;
		this.sprite.src = "img/energypotion.png";
	}		
}