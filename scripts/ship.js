//this.js

//contains ship class definition and functions

class Ship 	//class names capitalized per js convention
{
	//currently, CPX = X and CPY = Y but that can change if angles allowed are lower		
	constructor()
	{
		this.speed = GRID_SIZE/31;
		
		this.dev = 0; //tag for toggling developer options like never dying
		//can be improved probably		
		this.maxEnergy = 1000;
		this.energy = 1000;

		//also can be improved probably
		this.originalSupplies = 1000
		this.supplies = 1000;

		this.isMoving = false;

		this.offset_x = 0;
		this.offset_y = 0;
		this.angle = 0;
		this.distanceToTravel = 0;
		this.distanceGoal = 0;
		this.energyEfficiency = 0.01;
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

		this.offset_x %= GRID_SIZE;
		this.offset_y %= GRID_SIZE;
	}

	//is out of bounds? teleports somewhere random if so
	checkBoundary()
	{
		if(this.cpy >= MAP_MAX_Y || this.cpy <= MAP_MIN_Y || this.cpx >= MAP_MAX_X || this.cp <= MAP_MIN_X)
		{
			this.x = Math.floor(Math.random() * 2200) + GRID_SIZE;
			this.y = Math.floor(Math.random() * 2200) + GRID_SIZE;
		}
	}

	//actually moves ship
	commitMovement()
	{
		this.distanceGoal -= this.speed;
		this.distanceToTravel -= this.speed;
		if(this.distanceGoal < 0.001)
		{
			this.isMoving = false;
			return;
		}
		var old_x = this.x;
		var old_y = this.y;
		this.x += Math.sin(Math.PI/180 * (this.angle % 360)) * this.speed;
		this.y -= Math.cos(Math.PI/180 * (this.angle % 360)) * this.speed;

		this.offset_x -= (this.x - old_x);
		this.offset_y -= (this.y - old_y);
		
		//Temporary fix to test the checkEnergy function
		this.energy -= (this.energyEfficiency * this.distanceToTravel);
		
		//this.supplies -= (this.originalSupplies *.02);
		this.checkEnergy();
		this.checkSupplies();
		
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
		this.distanceToTravel += this.speed * 32;
	}

	decreaseDistance()
	{
		this.distanceToTravel -= this.speed * 32;
		if(this.distanceToTravel < 0)
		{
			this.distanceToTravel = 0;
		}
	}
	checkEnergy()
	{
		if(this.dev == 0){
			if(this.energy <= 0){ 
				alert("You ran out of energy! Game over.");
				location = location;
 
			} 
		}
	}
	//work in progress
	checkSupplies(){
		if(this.dev == 0){
			if(this.supplies < (this.originalSupplies *.02)){
				alert("You depleted your supplies! Game over.");
				location = location;
			}
		}
	}
	
	toggleDevMode(){
		this.dev = !(this.dev);
	}
}


