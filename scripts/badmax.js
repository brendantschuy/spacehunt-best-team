//obstacle.js

//contains obstacle definition etc

class BadMax
{
	constructor(x, y)
	{
		this.x = x-(x%GRID_SIZE);
		this.y = y-(y%GRID_SIZE);
		this.cpx = this.x/GRID_SIZE;
		this.cpy = this.y/GRID_SIZE;

		this.visible = true;
		//this.addToMap = true;
		this.sprite = new Image();
		this.sprite.src = "img/badmax_ship.png";
	}
}