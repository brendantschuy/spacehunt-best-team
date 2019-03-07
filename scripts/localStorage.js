// localStorage.js, work in progress 

// JSON game state object, work in progress 
var gameState = {
  "shipX": "0", // ship.cpx
  "shipY": "0", //ship.cpy,
  "shipSupplies": "0", //ship.supplies,  
  "shipEnergy": "0", //ship.energy,  
  "currency": "0", //ship.currency,  
  "obstacles": ["Asteroid", "Celeron", "Xeon", "Ryzen", "DeathStar", "Recipe", "BadMax", 
                "AbandonedFreighter", "SpaceStation"],
  //"activeGame": "false"
};

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
  localStorage.setItem("savedState", JSON.stringify(gameState)); 
}

// loads game from browser 
function load() {
  if (!supportsLocalStorage() || localStorage["activeGame"] == "false") {
    console.log("Browser does not support localStorage!");
    return false; 
  }
  let gameToLoad = prompt("Which game do you want to load?");  
  let gameState = JSON.parse(localStorage.getItem(gameToLoad));
  return gameState;
}

// clears entire storage (might not need as separate function)
function clearAll() {
  return localStorage.clear();
}
