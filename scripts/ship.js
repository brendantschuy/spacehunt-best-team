//this.js

//contains ship class definition and functions

class Ship 	//class names capitalized per js convention
{
	//currently, CPX = X and CPY = Y but that can change if angles allowed are lower		
	constructor()
	{
		this.speed = GRID_SIZE;
		this.energy = 1000;
		this.angle = 0;
		this.distanceToTravel = 0;
		this.energyEfficiency = 0;
		this.abs_x = 2.5 * GRID_SIZE;		//position on screen
		this.abs_y = 2.5 * GRID_SIZE;		//position on screen
		this.x = 1279;						//position on map
		this.y = 1279;						//position on map
		this.cpx = 10;						//celestial position
		this.cpy = 10;						//celestial position
		this.sprite = new Image();
		this.sprite.src = "img/ship1.png";
	}

	//obstacles etc would just correspond with some CP
	updatecp()
	{
		this.cpx = Math.floor(this.x / GRID_SIZE) + 1;
		this.cpy = Math.floor(this.y / GRID_SIZE) + 1;
	}

	//is out of bounds? teleports somewhere random if so
	checkBoundary()
	{
		if(this.cpy >= 20 || this.cpy <= 0 || this.cpx >= 20 || this.cpy <= 0)
		{
			this.x = Math.floor(Math.random() * 2200) + GRID_SIZE;
			this.y = Math.floor(Math.random() * 2200) + GRID_SIZE;
		}
	}

	//actually moves ship
	commitMovement()
	{
		this.x += Math.sin(Math.PI/180 * (this.angle % 360)) * this.distanceToTravel;
		this.y -= Math.cos(Math.PI/180 * (this.angle % 360)) * this.distanceToTravel;
		this.energy -= this.energyEfficiency * 0.1 * this.distanceToTravel;
		this.checkBoundary();
		this.updatecp();
	}

	rotateLeft()
	{
		this.angle = (this.angle - ANGLE_INCREMENT) % 360;
		if(this.angle < 0)
		{
			this.angle = 360 + this.angle;	//angle should never be negative
		}
	}

	rotateRight()
	{
		this.angle = (this.angle + ANGLE_INCREMENT) % 360;
	}

	increaseDistance()
	{
		this.distanceToTravel += this.speed;
	}

	decreaseDistance()
	{
		this.distanceToTravel -= this.speed;
		if(this.distanceToTravel < 0)
		{
			this.distanceToTravel = 0;
		}
	}


}


