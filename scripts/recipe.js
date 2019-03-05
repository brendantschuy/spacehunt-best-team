//recipe.js

//contains recipe definition etc

class Recipe
{
	constructor(cpx, cpy)
	{
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;	
		this.addToMap = true;
		this.sprite = new Image();
		this.sprite.src = "img/recipe.png"; //commented out because scan function sets the source now	
	}
}