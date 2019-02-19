// localStorage functions, work in progress 

// checks whether browser supports localStorage
function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] != null;
    } catch (e) {
      return false;
    }
  }

// game state object
var gameState = {
  shipXCoord: 0,
  shipYCoord: 0,
  supplies: 0,
  energy: 0,
  obstaclesXCoord: 0,
  obstaclesYCoord: 0,
  activeGame: false
};

// loads game from browser 
function resume(gameState) {
  if (!supportsLocalStorage() || localStorage["activeGame"] == "false")
      return false; 
	localStorage.getItem("state", JSON.parse(gameState));
}

// saves game state to browser, called whenever game state is changed
function save(gameState) {
  if (!supportsLocalStorage()) 
      return false; 
  localStorage.setItem("state", JSON.stringify(gameState));
  activeGame = true;
}

// clears entire storage (might not need as separate function)
function clearAll() {
	return localStorage.clear();
}


/* still need to figure out where to get ship's location, remaining supplies, remaining energy,
and obstacles once game is saved. also need to figure out where to call these functions in the other files */ 

