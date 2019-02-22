// localStorage.js, work in progress 

// game state object, work in progress 
var gameState = {
  shipX: 0,
  shipY: 0,
  shipSupplies: 0,
  shipEnergy: 0,
  AsteroidX: 0,
  AsteroidY: 0,
  CeleronX: 0,
  CeleronY: 0,
  XeonX: 0,
  XeonY: 0,
  RyzenX: 0,
  RyzenY: 0,
  RecipeX: 0,
  RecipeY: 0,
  activeGame: false
  //money: 0
};

// checks whether browser supports localStorage
function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] != null;
    } catch (e) {
      return false;
    }
  }

function initList() {
  var savedList = [];
}

// shows user a list of saved states, named by user
function displaySaved(savedList) {
    for(i = 0; i < savedList.length; i++)
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
  savedList.push(gameState);  // add saved game to list, change this also to allow user input 
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
  for(i = 0; i < savedList.length; i++) {
    if(response == (i+1)) 
      gameState = localStorage.getItem(savedList[i+1]); // must parse
  }
}

// clears entire storage (might not need as separate function)
function clearAll() {
  return localStorage.clear();
}