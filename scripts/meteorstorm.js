//meteorstorm.js

tookDamage = false;

class MeteorStorm{
	constructor(cpx, cpy){
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;
		//this.dmg = dmg;

		this.sprite = new Image();
		this.addToMap = true;
		//this.sprite.src = "img/meteor.png";
	}

	tryMeteor(x,y, ship){
		//alert((x) + (y));
		if(x + y == 0){
			//alert(this.tookDamage);
			if(!tookDamage) {
				//alert(tookDamage);
				randomDisaster(ship);
				makeitRain(ship);
				tookDamage = true;
			}
		}
	}
}

function makeitRain(){
	//alert("Check running");
	var meteor = document.createElement("img");
	meteor.src = "img/meteor_storm.gif";
	meteor.id = "meteor";
	meteor.height = screen.height; //fits to screen (not if zoomed out)
	meteor.width = screen.width;
	meteor.style.position = "absolute";
	meteor.style.left = 0;
	meteor.style.top = 0;
	meteor.style.pointerEvents = "none"; //makes it unclickable so you can click buttons still lol

	document.body.appendChild(meteor);
	setTimeout(function(){removeElement("meteor");tookDamage = false;},500); //remove element from celestialmap.js
}

function randomDisaster(ship){
	var event = (Math.floor(Math.random() * 100) % 5) + 1; //20% each case
	switch(event){
		case 5:
			ship.supplies -= (ship.supplies / 20);
		default:
			ship.getDamaged(20);
	}
	//alert(event);
}