// localStorage.js, work in progress 

// checks whether browser supports localStorage
function supportsLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] != null;
    } catch (e) {
      return false;
    }
  }

// game state object, work in progress 
var gameState = {
  shipXCoord: 0,
  shipYCoord: 0,
  supplies: 0,
  energy: 0,
  obstaclesXCoord: 0,
  obstaclesYCoord: 0,
  activeGame: false
};

// saves game state to browser 
function save(gameState) {
  if (!supportsLocalStorage()) {
    console.log("Browser does not support localStorage!");
    return false; 
  }
  localStorage.setItem("state", JSON.stringify(gameState));
  activeGame = true;
}

// loads game from browser 
function resume(gameState) {
  if (!supportsLocalStorage() || localStorage["activeGame"] == "false") {
    console.log("Browser does not support localStorage!");
    return false; 
  }  
  gameState = localStorage.getItem("state");
  
}

// clears entire storage (might not need as separate function)
function clearAll() {
	return localStorage.clear();
}


/* still need to figure out where to get ship's location, remaining supplies, remaining energy,
and obstacles once game is saved. also need to figure out where to call these functions in the other files */ 

