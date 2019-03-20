//meteorstorm.js

tookDamage = false;

class MeteorStorm{
	constructor(cpx, cpy){
		this.x = cpx*GRID_SIZE;
		this.y = cpy*GRID_SIZE;
		this.cpx = cpx;
		this.cpy = cpy;

		this.sprite = new Image();
		this.addToMap = true;
		//this.sprite.src = "img/meteor.png";
	}

	tryMeteor(x,y, ship){
		if(x + y == 0){
			if(!tookDamage) {
				randomDisaster(ship);
				makeitRain();
				tookDamage = true;
			}
		}
	}
}

function makeitRain(){
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
	setTimeout(function()
	{
		removeElement("meteor");
		tookDamage = false;
	},1000); 
}

function randomDisaster(ship){
	var event = (Math.floor(Math.random() * 100) % 5) + 1; //20% each case
	switch(event){
		case 5:
			/*ship.supplies -= (ship.supplies / 20);*/
			ship.supplies -= ship.supplies * 0.2;
		default:
			ship.getDamaged(20);
	}
}

// Removes an element from the document
//Example usage is to remove potion from map after consumption
function removeElement(elementId) {
    if(document.getElementById(elementId)) {
      var element = document.getElementById(elementId);
      element.parentNode.removeChild(element);
    }
}

//Toggles visibility of an object
function switchVisibility(elementId) {
  var element = document.getElementById(elementId);
  if(element.style.visibility == "hidden"){
    element.style.visibility = "visible";
  }else{
    element.style.visibility = "hidden";
  }
}

function elementExists(elementId) {
    if(document.getElementById(elementId)) {
      return true;
    }
    return false;
}