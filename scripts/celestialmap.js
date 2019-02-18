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
    //themap.style.position = "absolute";
    //themap.style.left = (MAP_WIDTH * GRID_SIZE)/3.5;
    //themap.style.top = (MAP_HEIGHT * GRID_SIZE)/2.5;
    //map.beginPath();
    //map.save();
    //map.translate(SHIP_ABS_X, SHIP_ABS_Y); 
    document.getElementById("map").appendChild(themap);
    drawBackground("theMap");
    drawThings("theMap");

  }else {
    switchVisibility("theMap");
  }
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function switchVisibility(elementId) {
  var element = document.getElementById(elementId);
  if(element.style.visibility == "hidden"){
    element.style.visibility = "visible";
  }else{
    element.style.visibility = "hidden";
  }
}