//this.js

//contains ship class definition and functions

class Ship 	//class names capitalized per js convention
{
	//currently, CPX = X and CPY = Y but that can change if angles allowed are lower		
	constructor()
	{	
		this.dev = false; //tag for toggling developer options like never dying
		//can be improved probably
		this.randWormholes = false; // Following above example for development		
		this.maxEnergy = 1000;
		this.energy = 1000;

		//also can be improved probably
		this.originalSupplies = 1000
		this.supplies = 1000;
		this.currency = 1000;
		this.projectiles = [];

		//ship movement
		this.isMoving = false;
		this.angle = 90;						//in degrees
		this.distanceToTravel = 0;			//in pixels
		this.energyEfficiency = 10;			//energy used per CP travelled

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
		this.cpx = SHIP_START_X;						//celestial position
		this.cpy = SHIP_START_Y;
		this.damage = 0;						//celestial position

		//ship graphics
		this.sprite = new Image();
		this.animationFrame = 0;
		this.sprite.src = "img/ship1.png";
	}

	//obstacles etc would just correspond with some CP
	updatecp(worm)
	{

		var oldcpx = this.cpx;
		var oldcpy = this.cpy;
		this.cpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
		this.cpy = Math.floor((this.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
		this.offset_x %= GRID_SIZE;
		this.offset_y %= GRID_SIZE;

		if(!worm){
			this.energy -= Math.abs((this.cpx - oldcpx) + (this.cpy - oldcpy)) * this.energyEfficiency;
		}
	}

	//is out of bounds? teleports somewhere random if so
	//if NOT out of bounds, function returns
	checkBoundary()
	{
		/*var oldcpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
		var oldcpy = Math.floor((this.y - SHIP_WIDTH) / GRID_SIZE) + 1;
		var cpyTraveled = this.cpy - oldcpy;
		var cpxTraveled = this.cpx - oldcpx;*/
		if(this.cpy >= MAP_MAX_Y || this.cpy < MAP_MIN_Y || this.cpx >= MAP_MAX_X || this.cpx < MAP_MIN_X) {
			if(this.randWormholes == true){
			
				//alert("You entered a wormhole! You will now be transported to somewhere random in space!");
				
				this.y = (Math.floor(Math.random() * (MAP_MAX_X + 1)));
				this.x = (Math.floor(Math.random() * (MAP_MAX_Y + 1)));

				this.cpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
				this.cpy = Math.floor((this.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
			}else{
				this.y = MAP_MIN_Y;
				this.x = MAP_MIN_X;
			}
			var audio_wormhole = new Audio('audio/wormhole.wav');
			audio_wormhole.volume = 1;
			audio_wormhole.play();
				
			this.restoreDefaults();
			//Prevents ship from exploding/dying if you enter a wormhole.
				
			// if(this.cpx > MAP_MAX_X)
			// {
			// 	cpTraveled = Math.abs(MAP_MAX_X - oldcpx) + 1;
			// }
			// else if(this.cpx < MAP_MIN_X)
			// {
			// 	cpTraveled = Math.abs(MAP_MIN_X - oldcpx) + 1;
			// }
			// else if(this.cpy > MAP_MAX_Y)
			// {
			// 	cpTraveled = Math.abs(MAP_MAX_Y - oldcpy) + 1;
			// }
			// else if(this.cpy < MAP_MIN_Y)
			// {
			// 	cpTraveled = Math.abs(MAP_MIN_Y - oldcpy) + 1;
			// }
			// return cpTraveled;

				//this.energy -= Math.abs(cpxTraveled + cpyTraveled) * this.energyEfficiency;

				/*this.cpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
				this.cpy = Math.floor((this.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
				this.offset_x %= GRID_SIZE;
				this.offset_y %= GRID_SIZE;*/


				//alert("You entered a wormhole! You will now be transported back to start! (0,0)");

				
				//Prevents ship from exploding/dying if you enter a wormhole.
				// FIX THIS HERE...
				/*if(this.cpx > MAP_MAX_X)
				{
					cpxTraveled = Math.abs(MAP_MAX_X - oldcpx) + 1;
					cpyTraveled = 0;
				}
				else if(this.cpx < MAP_MIN_X)
				{
					cpxTraveled = Math.abs(MAP_MIN_X - oldcpx) + 1;
					cpyTraveled = 0;
				}
				else if(this.cpy > MAP_MAX_Y)
				{
					cpyTraveled = Math.abs(MAP_MAX_Y - oldcpy) + 1;
					cpxTraveled = 0;
				}
				else if(this.cpy < MAP_MIN_Y)
				{
					cpyTraveled = Math.abs(MAP_MIN_Y - oldcpy) + 1;
					cpxTraveled = 0;
				}
				else
				{
					return;
				}
				
				this.energy -= Math.abs(cpxTraveled + cpyTraveled) * this.energyEfficiency;

				this.cpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
				this.cpy = Math.floor((this.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
				this.offset_x %= GRID_SIZE;
				this.offset_y %= GRID_SIZE;*/

			// This code allows the space ship to exit one side and enter the other side of the board
	 		/*if(this.cpy >= MAP_MAX_Y){
				alert("You entered a wormhole! You will now be transported to the other side of space!");
				this.y = (MAP_MIN_Y * GRID_SIZE) + GRID_SIZE;
				this.cpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
				this.cpy = Math.floor((this.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
			}
			else if(this.cpy <= MAP_MIN_Y){
				alert("You entered a wormhole! You will now be transported to the other side of space!");
				this.y = (MAP_MAX_Y * GRID_SIZE) - GRID_SIZE;
				this.cpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
				this.cpy = Math.floor((this.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
			}
			if(this.cpx >= MAP_MAX_X){
				alert("You entered a wormhole! You will now be transported to the other side of space!");
				this.x = (MAP_MIN_X * GRID_SIZE) + GRID_SIZE;
				this.cpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
				this.cpy = Math.floor((this.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
			}
			else if(this.cpx <= MAP_MIN_X){
				alert("You entered a wormhole! You will now be transported to the other side of space!");
				this.x = (MAP_MAX_X * GRID_SIZE) - GRID_SIZE;
				this.cpx = Math.floor((this.x - SHIP_WIDTH) / GRID_SIZE) + 1;
				this.cpy = Math.floor((this.y - SHIP_HEIGHT) / GRID_SIZE) + 1;
			}
			else
				return;
			*/
			return true;
		}
		return false;
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
		
		this.checkEnergy();
		this.checkSupplies();
		
		
		this.updatecp(this.checkBoundary());

	}

	beginMoving()
	{
		if(this.distanceToTravel > 0)	//don't use supplies if not moving
		{
			this.supplies -= 0.003 * this.originalSupplies + 0.02 * this.supplies;
		}
		this.isMoving = true;
		this.distanceGoal = this.distanceToTravel;
	}

	rotateLeft()
	{
		//disabling turning while moving for now, or else it gets into some pretty 
		//funky floating point errors
		if(!this.isMoving)
		{
			this.angle = (this.angle - ANGLE_INCREMENT) % 360;
			if(this.angle < 0)
			{
				this.angle = 360 + this.angle;	//angle should never be negative
			}
		}
	}

	rotateRight()
	{
		//disabling turning while moving for now, or else it gets into some pretty
		//funky floating point errors
		if(!this.isMoving)
		{
			this.angle = (this.angle + ANGLE_INCREMENT) % 360;
		}
	}

	increaseDistance()
	{
		this.distanceToTravel += GRID_SIZE;
	}

	decreaseDistance()
	{
		this.distanceToTravel -= GRID_SIZE;
		if(this.distanceToTravel < GRID_SIZE)
		{
			if(Math.abs(this.offset_y) > 0)
			{
				this.distanceToTravel = GRID_SIZE - Math.abs(this.offset_y);
			}
			if(Math.abs(this.offset_x) > 0)
			{
				this.distanceToTravel = GRID_SIZE - Math.abs(this.offset_x);
			}
		}
		//this.distanceToTravel -= Math.sin(this.angle) * (GRID_SIZE - ship.offset_y % GRID_SIZE) + Math.cos(this.angle) * (GRID_SIZE - ship.offset_x % GRID_SIZE);
		if(this.distanceToTravel < 0)
		{
			this.distanceToTravel = 0;
		}
	}

	checkEnergy()
	{
		if(this.dev == false){
			if(this.energy <= 0){ 
				alert("You ran out of energy! Game over.");
				location = location;
 
			} 
		}
	}
	//work in progress
	checkSupplies(){
		if(this.dev == false){
			if(this.supplies < (this.originalSupplies *.02)){
				alert("You depleted your supplies! Game over.");
				location = location;
			}
		}
	}

	toggleDevMode(){
		this.dev = !(this.dev);
	}
	ghostMode(){
		this.isGhost = !(this.isGhost);
	}

	toggleRandWormholesMode(){
		this.randWormholes = !(this.randWormholes);
	}

	//restores default info about ship 
	restoreDefaults()
	{
		this.isMoving = false;
		this.distanceToTravel = 0;
		this.offset_y = 0;
		this.offset_x = 0;
	}

	getDamaged(dmg){
		this.damage += dmg;
	}		
		
}


