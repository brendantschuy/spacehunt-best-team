//commbox.js

// fillText -- (text, x, y) absolute x and y of the canvas 
//Displays messages to player
class CommBox
{
	constructor()
	{
		this.toggle = false;
		this.currentObstacle;
		this.x;
		this.y;
	}


	drawBox()
	{
		var ctx = document.getElementById("gameScreen").getContext('2d');
		let obstacleName = this.currentObstacle.constructor.name;

		if(obstacleName == "DeathStar")
		{
			ctx.fillStyle = "black";
			ctx.fillRect(0, 512, 640, 128);
			ctx.fillStyle = "red";
		}
		else
		{
			ctx.fillStyle = "white";
			ctx.fillRect(0, 512, 640, 128);
			ctx.fillStyle = "black";
		}
		ctx.font = "20px Arial";
		switch(obstacleName)
		{
			case("EnergyPotion") :
				ctx.fillText("You obtained an energy potion! Your energy is restored by " + this.currentObstacle.hp + ".", 20, 560);
				break;
			case("Asteroid") : 
				ctx.fillText("YOU HIT AN ASTEROID. Game over.", 20, 560);
				break;
			case("Xeon") : case ("Celeron") : case("Ryzen") : 
				ctx.fillText("Welcome to the planet of " + obstacleName + "!", 20, 560);
				//ctx.fillText("Press L to land or O to orbit (not implemented).", 20, 590);
				break;
			case("Planet") : 
				ctx.fillText("Welcome to the planet of " + this.currentObstacle.planetName + "!", 20, 560);
				break;
			case("Recipe") : 
				ctx.fillText("You win the game :)", 20, 560);
				break;
			case("DeathStar") : 
				ctx.fillText("Resistance is futile. Wait, wrong universe.", 20, 560);
				break;
			case("SpaceStation") :
				ctx.fillText("You found a space station! Would you like to play a game of chance?", 7, 560);
				break;
			case("AbandonedFreighter") :
				ctx.fillText("You found an abandoned freighter! You get some additional resources", 5, 560);
				ctx.fillText("and your ship is healed to full!", 5, 590);
				break;
			case("MeteorStorm") :
				ctx.fillText("You have entered a Meteor Storm!\nYou will continue to take damage every 0.5 seconds. RUN!", 5, 560);
				break;
			/* case("BadMax") :
				switch(this.chance)
				{
					//enter chances here:
					case 0 : 
							ctx.fillText("BAD MAX SHOT YOU DOWN!", 5, 560);
							break;
					case 1 : 
							ctx.fillText("BadMax stole half of your energy and supplies.", 5, 560);
							break;
					case 2 : 
							ctx.fillText("You successfully fended off BadMax for now.", 5, 560);
							break;
				}
*/
			case("Wormhole") :
				ctx.fillText("You have been teleported!", 5, 560);
				break;

			default:
				ctx.fillText((this.currentObstacle),this.x,this.y);
				break;
		}

		return true;	
	}

	drawNewBox(obstacle, toggle,x,y)
	{
		this.x = x;
		this.y = y;
		this.toggle = toggle;
		this.currentObstacle = obstacle;
		
		this.drawBox();
	}

	drawBadMaxBox(obstacle, toggle, chance)
	{
		this.chance = chance;
		this.drawNewBox(obstacle, toggle, 5, 560);
	}

}