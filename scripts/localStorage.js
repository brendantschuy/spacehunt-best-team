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
  RecipeX: 0, //Recipe.cpx,   
  RecipeY: 0, // Recipe.cpy,  
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
function save(gameState, savedList) {
  if (!supportsLocalStorage()) {
    console.log("Browser does not support localStorage!");
    return false; 
  }
  localStorage.setItem("state", JSON.stringify(gameState)); // change to allow user input for state name
  activeGame = true;
  savedList.push(gameState);  
}

// loads game from browser 
function load(gameState, savedList) {
  var response;

  if (!supportsLocalStorage() || localStorage["activeGame"] == "false") {
    console.log("Browser does not support localStorage!");
    return false; 
  }  
  displaySaved(); // display list of saved games
  response = prompt("Which game would you like to load? Enter a number, starting at 1.");
  for(var i = 0; i < savedList.length; i++) {
    if(response == (i+1)) 
      gameState = JSON.parse(localStorage.getItem(savedList[i+1]));
  }
}

// clears entire storage (might not need as separate function)
function clearAll() {
  return localStorage.clear();
}
