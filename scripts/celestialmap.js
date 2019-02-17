function drawMapButton(){
  var test = document.getElementById("mapicon");
  if(!test){
    var left = document.getElementById("controls");
    var element = document.createElement("button");
    element.id = "mapicon";
    element.name = "map";
    element.innerHTML = "Map";
    element.value = "map.png";
    element.onclick = function() {
  	  showMap();
  	}
    //element.style.right = GAME_SCREEN_WIDTH;
    
    // Not sure what this does exactly, but causes a null and game screen will not 
    //   show on index.html when uncommented <---------------------------------------
    //left.appendChild(element);
  }else {
    removeElement("mapicon");
    drawMapButton();
  }
}

function showMap(){
  var test = document.getElementById("theMap");
  if(!test){
    var themap = document.createElement("canvas");
    themap.id = "theMap";
    var map = themap.getContext('2d');
    themap.height = (MAP_HEIGHT * GRID_SIZE)/2;
    themap.width = (MAP_WIDTH * GRID_SIZE)/2;

    map.fillStyle = "white";
    map.fillRect(0, 0, 640, 480);
    themap.style.position = "absolute";
    themap.style.left = (MAP_WIDTH * GRID_SIZE)/3.5;
    themap.style.top = (MAP_HEIGHT * GRID_SIZE)/2.5;
    //map.beginPath();
    //map.save();
    //map.translate(SHIP_ABS_X, SHIP_ABS_Y);  
    //drawObstacles(map);
    //drawItems(map);
    //drawShip(map);
    document.getElementById("leftside").appendChild(themap);

  }else if(test.style.visibility == "hidden"){
      test.style.visibility = "visible";
  }else{
    test.style.visibility = "hidden";
  }
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}