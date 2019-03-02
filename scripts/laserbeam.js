//laserbeam.js

class LaserBeam
{
	constructor(x, y, angle)
	{
		this.x = x;
		this.y = y;
		this.cpx = this.x/GRID_SIZE;
		this.cpy = this.y/GRID_SIZE;
				
		this.speed = 5;
		this.yv = -1 * Math.cos(Math.PI/180 * angle) * this.speed;
		this.xv = Math.sin(Math.PI/180 * angle) * this.speed;

		this.sprite = new Image();
		this.sprite.src = "img/overload_thunder_beam.png";
		this.visible = true;
		this.onMapList = true;
	}
}