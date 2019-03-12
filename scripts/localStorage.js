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

var savedList = [];

// saves game state to browser 
function save() {
  if (!supportsLocalStorage()) {
    console.log("Browser does not support localStorage!");
    return false; 
  }
  var savedState = prompt("Enter a name for this game.")
  localStorage.setItem(savedState, JSON.stringify(gameState)); 
  savedList.push(savedState);
  //console.log(savedList);
}

function initializeSavedGame()
{
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

// checks whether browser supports localStorage
function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] != null;
    } catch (e) {
      return false;
    }
}

// shows user a list of saved games, named by user
function displaySaved(savedList) {
    for(var i = 0; i < savedList.length; i++)
      console.log(savedList[i]);
}

// clears entire storage (might not need as separate function)
function clearAll() {
  return localStorage.clear();
}
