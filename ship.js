//ship.js

//contains ship class definition and functions

class Ship 	//class names capitalized per js convention
{
	constructor()
	{
		this.speed = GRID_SIZE;
		this.energy = 1000;
		this.angle = 0;
		this.distanceToTravel = 0;
		this.energyEfficiency = 0;
		this.x = 2.5 * GRID_SIZE;
		this.y = 2.5 * GRID_SIZE;
		this.cpx = 0;
		this.cpy = 0;
		this.sprite = new Image();
		this.sprite.src = "img/ship.png";
	}

	//obstacles etc would just correspond with some CP
	updatecp()
	{
		this.cpx = Math.floor(this.x / GRID_SIZE) + 1;
		this.cpy = Math.floor(this.y / GRID_SIZE) + 1;
	}

	//actually moves ship
	commitMovement(		)
	{
		this.x += Math.sin(Math.PI/180 * (this.angle % 360)) * this.distanceToTravel;
		this.y -= Math.cos(Math.PI/180 * (this.angle % 360)) * this.distanceToTravel;
		this.updatecp();
		this.energy -= this.energyEfficiency * 0.1 * this.distanceToTravel;
	}
}


