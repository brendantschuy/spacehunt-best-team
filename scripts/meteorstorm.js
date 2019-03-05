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
				ship.getDamaged(20);
				makeitRain(ship);
				tookDamage = true;
			}
		}
	}
}

function makeitRain(){
	//alert("Check running");
	var meteor = document.createElement("img");
	meteor.src = "img/meteors.gif";
	meteor.id = "meteor";
	meteor.height = screen.height;
	meteor.width = screen.width;
	meteor.style.position = "absolute";
	meteor.style.left = 0;
	meteor.style.top = 0;

	document.body.appendChild(meteor);
	setTimeout(function(){removeElement("meteor");tookDamage = false;},500);
}