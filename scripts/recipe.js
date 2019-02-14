//recipe.js

//contains recipe definition etc

class Recipe
{
	constructor(x, y, cpx, cpy)
	{
		this.x = x;
		this.y = y;
		this.cpx = cpx;
		this.cpy = cpy;	
		this.sprite = new Image();
		//this.sprite.src = "img/recipe.png"; //commented out because scan function sets the source now
		
	}
}