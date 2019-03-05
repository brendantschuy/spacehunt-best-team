//genesissaber.js

class GenesisSaber
{
	constructor(x, y, angle)
	{
		this.x = x;
		this.y = y;
		this.cpx = this.x/GRID_SIZE;
		this.cpy = this.y/GRID_SIZE;
		this.animationFrame = 0;
				
		this.speed = 7;
		this.yv = -1 * Math.cos(Math.PI/180 * angle) * this.speed;
		this.xv = Math.sin(Math.PI/180 * angle) * this.speed;

		this.sprite = new Image();
		//this.sprite.src = "img/laserbeam.png";
		this.sprite.src = "img/animations/genesissaber/genesis_saber7.png";
		this.visible = true;
		this.addToMap = false;
	}
}