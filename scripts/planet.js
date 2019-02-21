//planet.js

//contains planet definitions. 

class Planet
{
	constructor(cpx, cpy)
	{
		this.idNumber = id;
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;
		
		//Can be changed in the future
		this.radius = 2;
		this.minLength = cpx - 1;
		this.maxLength = cpx + 1;
		this.minHeight = cpy - 1;
		this.maxHeight = cpy + 1;	

		this.sprite = new Image();
		this.visible = true;
		this.onmapList = false;
		//x is the number of each planet (1 - 7)
		this.sprite.src = "img/planet" + this.idNumber + ".png";
	}		
}

class Celeron {
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;
		
		//Can be changed in the future
		this.radius = 2;
		this.minLength = cpx - 1;
		this.maxLength = cpx + 1;
		this.minHeight = cpy - 1;
		this.maxHeight = cpy + 1;	

		this.sprite = new Image();
		this.visible = true;
		this.onMapList = false;
		this.sprite.src = "img/celeron.png";
	}
}

class Xeon{ 
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;
		
		//Can be changed in the future. For now, all planets have a radius of 2.
		this.radius = 2;
		this.minLength = cpx - 1;
		this.maxLength = cpx + 1;
		this.minHeight = cpy - 1;
		this.maxHeight = cpy + 1;	

		this.sprite = new Image();
		this.visible = true;
		this.onMapList = false;
		this.sprite.src = "img/xeon.png";
	}
}

class Ryzen { 
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;
		
		//Can be changed in the future. For now, all planets have a radius of 2.
		this.radius = 2;
		this.minLength = cpx - 1;
		this.maxLength = cpx + 1;
		this.minHeight = cpy - 1;
		this.maxHeight = cpy + 1;	

		this.sprite = new Image();
		this.visible = true;
		this.onMapList = false;	
		this.sprite.src = "img/ryzen.png";
	}
}



//secret
class DeathStar { 
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;
		
		//Can be changed in the future. For now, all planets have a radius of 2.
		this.radius = 2;
		this.minLength = cpx - 1;
		this.maxLength = cpx + 1;
		this.minHeight = cpy - 1;
		this.maxHeight = cpy + 1;	

		this.sprite = new Image();
		this.visible = false;	
		this.onMapList = false;
		this.sprite.src = "img/ryzen.png";
	}
}