// localStorage.js, work in progress 

// game state object, work in progress 
var gameState = {
  shipX: 0, // ship.cpx
  shipY: 0, //ship.cpy,
  shipSupplies: 0, //ship.supplies,  
  shipEnergy: 0, //ship.energy,  
  currency: 0, //ship.currency,  
  AsteroidX: 0, //Asteroid.cpx, 
  AsteroidY: 0, //Asteroid.cpy, 
  CeleronX: 0, //Planet.Celeron.cpx,  
  CeleronY: 0, //Planet.Celeron.cpy,  
  XeonX: 0, //Planet.Xeon.cpx,     
  XeonY: 0, //Planet.Xeon.cpy,    
  RyzenX: 0, //Planet.Ryzen.cpx,   
  RyzenY: 0, //Planet.Ryzen.cpy,   
  DeathStarX: 0, // DeathStar.cpx 
  DeathStarY: 0, // DeathStar.cpy
  RecipeX: 0, //Recipe.cpx,   
  RecipeY: 0, // Recipe.cpy,  
  BadMaxX: 0, // BadMax.cpx,
  BadMaxY: 0, // BadMax.cpy,
  AbandonedFreighterX: 0, // AbandonedFreighter.cpx
  AbandonedFreighterY: 0, // AbandonedFreighter.cpy
  SpaceStationX: 0, // SpaceStation.cpx
  SpaceStationY: 0, // SpaceStation.cpy

  activeGame: false
};

// checks whether browser supports localStorage
function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] != null;
    } catch (e) {
      return false;
    }
}

// initialize list of saved games 
function initList() {
  var savedList = [];
}

// shows user a list of saved games, named by user
function displaySaved(savedList) {
    for(var i = 0; i < savedList.length; i++)
      console.log(savedList[i])
}

// saves game state to browser 
function save() {
  if (!supportsLocalStorage()) {
    console.log("Browser does not support localStorage!");
    return false; 
  }
  var savedState = prompt("Enter a name for this game.")
  localStorage.setItem(savedState, JSON.stringify(gameState)); 
  activeGame = true;
  savedList.push(gameState);  
}

// loads game from browser 
function load(savedState) {
  //var response;

  if (!supportsLocalStorage() || localStorage["activeGame"] == "false") {
    console.log("Browser does not support localStorage!");
    return false; 
  }  
 /* displaySaved(); // display list of saved games
  response = prompt("Which game would you like to load? Enter a number, starting at 1.");
  for(var i = 0; i < savedList.length; i++) {
    if(response == (i+1)) 
      gameState = JSON.parse(localStorage.getItem(savedList[i+1]));
  }*/
  gameState = JSON.parse(localStorage.getItem(savedState));
}

// clears entire storage (might not need as separate function)
function clearAll() {
  return localStorage.clear();
}
