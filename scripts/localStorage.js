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
  "activeGame": false
};

function initializeSavedGame()
{
  //var a, b;

  // just trying to get these working for now
  shipX = this.ship.cpx;
  shipY = this.ship.cpy;
  supplies = this.ship.supplies;
  energy = this.ship.energy;
  currency = this.ship.currency;
  

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

  activeGame = true;
}

/*// loads game from browser 
function load() {
  if (!supportsLocalStorage() || localStorage["activeGame"] == "false") {
    console.log("Browser does not support localStorage!");
    return false; 
  }
  let gameToLoad = prompt("Which game do you want to load?");  
  let gameState = JSON.parse(localStorage.getItem(gameToLoad));
  return gameState;
}*/

// clears entire storage (might not need as separate function)
function clearAll() {
  return localStorage.clear();
}
