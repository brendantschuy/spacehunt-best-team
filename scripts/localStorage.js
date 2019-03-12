// localStorage.js, work in progress 

// JSON game state object, work in progress 
var gameState = {
  "shipX": 10, // ship.cpx
  "shipY": 10, //ship.cpy,
  "supplies": 1000, //ship.supplies,  
  "energy": 1000, //ship.energy,  
  "currency": 1000, //ship.currency,  
  "obstacles": ["Asteroid", "Celeron", "Xeon", "Ryzen", "DeathStar", "Recipe", "BadMax", 
                "AbandonedFreighter", "SpaceStation", "Wormhole"],
  //"activeGame": false
};

// saves game state to browser 
function save() {
  if (!supportsLocalStorage()) {
    console.log("Browser does not support localStorage!");
    return false; 
  }
  var savedState = prompt("Enter a name for this game.")
 // var savedList = [];
  localStorage.setItem(savedState, JSON.stringify(gameState)); 
  //savedList.push(savedState);
  //console.log(savedList);
}

function initializeSavedGame()
{
  // just getting these working for now
  gameState.shipX = this.ship.cpx;
  gameState.shipY = this.ship.cpy;
  gameState.supplies = this.ship.supplies;
  gameState.energy = this.ship.energy;
  gameState.currency = this.ship.currency;
  
  // saving obstacles
  /*for(var i = 0; i < this.obstacles.length; i++)
  { 
    objName = this.obstacles[i].constructor.name;
    switch(objName) {
      case "Asteroid": 
        gameState.obstacles["Asteroid"] = this.obstacles[i].cpx;
        gameState.obstacles["Asteroid"].cpy = this.obstacles[i].cpy;
        break;
      default: break;
    }
  }*/
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
