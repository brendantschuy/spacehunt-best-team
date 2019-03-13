// localStorage.js 

// JSON game state object
var gameState = {
  "shipX": 0, // ship.cpx
  "shipY": 0, //ship.cpy,
  "supplies": 1000, //ship.supplies,  
  "energy": 1000, //ship.energy,  
  "currency": 1000, //ship.currency,  
  "damage": 0,
  "obstacles": []  
};

var savedList = []; // list of saved states
var savedState;     // user-defined name for state

// saves game state to browser 
function save() {
  if (!supportsLocalStorage()) {
    console.log("Browser does not support localStorage!");
    return false;
  }
  savedState = prompt("Enter a name for this game.")
  localStorage.setItem(savedState, JSON.stringify(gameState)); 
  savedList.push(savedState);
}

function initializeSavedGame()
{
  if(this.obstacles.length == 0) {
    alert("Start the game to save!");
    return;
  }

  gameState.shipX = this.ship.cpx;
  gameState.shipY = this.ship.cpy;
  gameState.supplies = this.ship.supplies;
  gameState.energy = this.ship.energy;
  gameState.currency = this.ship.currency;
  gameState.damage = this.ship.damage;
  
  // saving obstacles
  for(var i = 0; i < this.obstacles.length; i++)
  { 
    objName = this.obstacles[i].constructor.name;
    switch(objName) {
      case "Asteroid": 
        gameState.obstacles.push("Asteroid X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Asteroid Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "Celeron": 
        gameState.obstacles.push("Celeron X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Celeron Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "Ryzen": 
        gameState.obstacles.push("Ryzen X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Ryzen Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "Xeon": 
        gameState.obstacles.push("Xeon X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Xeon Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "SpaceStation": 
        gameState.obstacles.push("Space Station X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Space Station Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "AbandonedFreighter": 
        gameState.obstacles.push("Abandoned Freighter X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Abandoned Freighter Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "MeteorStorm": 
        gameState.obstacles.push("Meteor Storm X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Meteor Storm Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "BadMax": 
        gameState.obstacles.push("Bad Max X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Bad Max Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "Wormhole": 
        gameState.obstacles.push("Wormhole X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Wormhole Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "Recipe": 
        gameState.obstacles.push("Recipe X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Recipe Y-Coord: " + this.obstacles[i].cpy);
        break;
      case "DeathStar": 
        gameState.obstacles.push("Death Star X-Coord: " + this.obstacles[i].cpx);
        gameState.obstacles.push("Death Star Y-Coord: " + this.obstacles[i].cpy);
        break;
      default: break;
    }
  }
  save();
} 

// loads game state from browser 
function load() {
	if (!supportsLocalStorage() || localStorage["activeGame"] == "false") {
	  console.log("Browser does not support localStorage!");
	  return false; 
	}
	displaySaved();
	var gameToLoad = prompt("Which game do you want to load?"); // can't pick from multiple states yet so this is not useful except for testing
	
	gameState = JSON.parse(localStorage.getItem(savedState));
  
  this.ship.cpx = gameState.shipX;
  this.ship.cpy = gameState.shipY;
  this.ship.energy = gameState.energy;
  this.ship.supplies = gameState.supplies;
  this.ship.currency = gameState.currency;
  this.ship.damage = gameState.damage;

	for(var i = 0; i < obstacles.length; i++)
	{
		var objName = gameState.obstacles[i];
		switch(objName) {
      case "Asteroid X-Coord": 
        this.obstacles.push(new Asteroid(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Celeron X-Coord": 
				this.obstacles.push(new Celeron(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Ryzen X-Coord": 
				this.obstacles.push(new Ryzen(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Xeon X-Coord": 
				this.obstacles.push(new Xeon(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Space Station X-Coord": 
				this.obstacles.push(new SpaceStation(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Abandoned Freighter X-Coord": 
				this.obstacles.push(new AbandonedFreighter(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Meteor Storm X-Coord": 
				this.obstacles.push(new MeteorStorm(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Bad Max X-Coord": 
				this.obstacles.push(new BadMax(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Wormhole X-Coord": 
				this.obstacles.push(new Wormhole(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Recipe X-Coord": 
				this.obstacles.push(new Recipe(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      case "Death Star X-Coord": 
				this.obstacles.push(new DeathStar(gameState.obstacles[i], gameState.obstacles[i+1]))
        break;
      default: break;
    }
  }
}

// checks whether browser supports localStorage
function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] != null;
    } catch (e) {
      return false;
    }
}

// shows user a list of saved games, named by user
function displaySaved() {
    for(var i = 0; i < savedList.length; i++)
      alert(savedList[i]);
}

