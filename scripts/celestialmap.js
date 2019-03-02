var mapRatio = 1;   //increases for smaller screen resolution
var mapScale = 32;  //ratio of px on game to px on map
var map_y = 20;
var map_x = 20;

function showMap(obstacles){
  var test = document.getElementById("mapCanvas");

  //Use "test" if mapCanvas is NOT dynamically created
  if(!test){
    var mapCvs = document.createElement("canvas");
    mapCvs.id = "mapCanvas";
    var mapCtx = mapCvs.getContext('2d');

    //Makes map smaller below a certain screen resolution threshold
    if(window.screen.availWidth < 1367)
    {
      mapRatio = 1.5;
    }

    mapCvs.height = (MAP_HEIGHT * GRID_SIZE)/mapRatio/1.1; //581 px or 387 px, depending on screen res
    mapCvs.width = (MAP_WIDTH * GRID_SIZE)/mapRatio/1.1;   //581 px or 387 px, depending on screen res

    //Creates background for testing purposes, will be replaced w/ scroll
    mapCtx.fillStyle = "RGBA(100, 100, 100, 0.3)";
    mapCtx.fillRect(0, 0, mapCvs.height, mapCvs.width);

    //Commented out text is for scroll background pic:
    //mapCvs.style.left = 29.5;
    //mapCvs.style.top = -3.5;
    //document.getElementById("map").style.backgroundSize = mapCvs.height + "px " +  mapCvs.width + "px";
    //var backgroundImage = new Image();
    //backgroundImage.src = "img/parchment.jpg";
    //map.drawImage(backgroundImage, 0, 0);

    //Determines where to put map canvas. Depends on screen resolution.
    var largeMap = document.getElementById("widescreenOnly");

    if(window.getComputedStyle(largeMap).display === "none")
    {
      document.getElementById("dev-buttons").appendChild(mapCvs);
    }
    else
    {
      /*document.getElementById("dev").appendChild(mapCvs);*/
      document.getElementById("map-div").appendChild(mapCvs);
    }

    drawThingsMap("mapCanvas",obstacles);   

  }else {
    //switchVisibility("mapCvs");
    drawThingsMap("mapCanvas",obstacles);
  }
}

//Draws things on a given DOM object, given that object's ID and 
//the array of things to be drawn
//Main use is to write object names on "map" canvas
function drawThingsMap(elementID,obstacles) {
  var ctx = document.getElementById(elementID).getContext('2d');
  ctx.beginPath();
  ctx.save();

  drawObstaclesMap(ctx,obstacles);
}

//draws all obstacles
function drawObstaclesMap(ctx,obstacles) {
  obstacles.forEach(function (item)
  {
    if(item.visible && !item.onMapList){
      objName = item.constructor.name;  //gets exact name of user-defined type
      ctx.beginPath();

      //Color codes objects based on names
      switch(objName)
      {
        case("Asteroid") : 
          ctx.fillStyle = "coral";
          break;
        case("Celeron") : case("Xeon") : case ("Ryzen") : 
          ctx.fillStyle = "aquamarine";
          break;
        case("Planet") : 
          ctx.fillStyle = "aquamarine";
          break;
        case("EnergyPotion") : 
          ctx.fillStyle = "greenyellow";
          break;
        case("Recipe") :
          ctx.fillStyle = "white";
          break;
        case("DeathStar") : 
          ctx.fillStyle = "black";
          break;
        case("BadMax") : 
          ctx.fillStyle = "red";
          break;
      }
      
      ctx.font = "bold";
      ctx.fillText(objName + ": " + item.cpx + ", " + item.cpy, map_x, map_y);
      map_y += 20;

      item.onMapList = true;

      //This prevents us from writing things on the map off the end of the doc
      if(map_y > 381)
      {
        map_y = 20;
        map_x += 90;
      }

      ctx.closePath();
    }
  });

}

// Removes an element from the document
//Example usage is to remove potion from map after consumption
function removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

//Toggles visibility of an object
function switchVisibility(elementId) {
  var element = document.getElementById(elementId);
  if(element.style.visibility == "hidden"){
    element.style.visibility = "visible";
  }else{
    element.style.visibility = "hidden";
  }
}