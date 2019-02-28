//obstacle.js

//contains obstacle definition etc

class badmax
{
	constructor(x, y)
	{
		this.x = x-(x%GRID_SIZE);
		this.y = y-(y%GRID_SIZE);
		this.cpx = this.x/GRID_SIZE;
		this.cpy = this.y/GRID_SIZE;

		this.visible = true;
		//this.onMapList = false;
		this.sprite = new Image();
		this.sprite.src = "img/badmax_ship.png";
	}
}