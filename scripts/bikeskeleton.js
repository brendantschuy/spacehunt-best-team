//bikeskeleton.js

//contains skeletons on bikes definition etc

class BikeSkeleton
{
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;

		this.visible = true;
		this.addToMap = true;
		this.sprite = new Image();
		this.sprite.src = "img/skeleton_on_motorcycle.png";
	}
}