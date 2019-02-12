//this.js

//contains ship class definition and functions

class Ship 	//class names capitalized per js convention
{
	//currently, CPX = X and CPY = Y but that can change if angles allowed are lower		
	constructor()
	{	
		this.dev = 0; //tag for toggling developer options like never dying
		//can be improved probably		
		this.maxEnergy = 1000;
		this.energy = 1000;

		//also can be improved probably
		this.originalSupplies = 1000
		this.supplies = 1000;

		//ship movement
		this.isMoving = false;
		this.angle = 0;						//in degrees
		this.distanceToTravel = 0;			//in pixels
		this.energyEfficiency = 20;			//energy used per CP travelled

		//ship position
		/*There are a lot of variables here for ship position:
			x & y
				These indicate the ship's position on the map in terms of pixels,
				measured from the origin of the map at (0, 0) in the top left
				of the entire map. 
			cpx & cpy
				These indicate the ship's "celestial position", or in other words,
				which box the ship is currently in. CPs contain different obstacles,
				items, and the recipe. **These are different from x & y mainly so we can
				handle the ship moving at various angles as required.**
			offset_x & offset_y
				These indicate the distance of the ship from the center of the square
				in which it currently is located, in pixels. The ONLY use for these is
				to draw the gridlines in the correct location as the ship moves.*/
		this.x = 1279;						//position on map, in pixels
		this.y = 1279;						//position on map, in pixels
		this.offset_x = 0;					//distance from center of square
		this.offset_y = 0;					//distance from center of square
		this.cpx = 10;						//celestial position
		this.cpy = 10;						//celestial position

		//ship graphics
		this.sprite = new Image();
		this.sprite.src = "img/ship1.png";
	}

	//obstacles etc would just correspond with some CP
	updatecp()
	{
		var oldcpx = this.cpx;
		var oldcpy = this.cpy;
		this.cpx = Math.floor(this.x / GRID_SIZE) + 1;
		this.cpy = Math.floor(this.y / GRID_SIZE) + 1;

		this.energy -= Math.abs((this.cpx - oldcpx) + (this.cpy - oldcpy)) * this.energyEfficiency;

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
		if(this.distanceToTravel < 0.001)
		{
			this.isMoving = false;
			return;
		}
		this.distanceToTravel -= SHIP_SPEED;
		var old_x = this.x;
		var old_y = this.y;
		this.x += Math.sin(Math.PI/180 * (this.angle % 360)) * SHIP_SPEED;
		this.y -= Math.cos(Math.PI/180 * (this.angle % 360)) * SHIP_SPEED;

		this.offset_x -= (this.x - old_x);
		this.offset_y -= (this.y - old_y);
		
		//Temporary fix to test the checkEnergy function
		//this.energy -= (this.energyEfficiency * this.distanceToTravel);
		
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
		this.distanceToTravel += GRID_SIZE;
	}

	decreaseDistance()
	{
		this.distanceToTravel -= GRID_SIZE;
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


