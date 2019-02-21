var mapRatio = 1;   //increases for smaller screen resolution
var mapScale = 32;  //ratio of px on game to px on map

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
      document.getElementById("dev").appendChild(mapCvs);
    }

    drawThingsMap("mapCanvas",obstacles);   

  }else {
    //switchVisibility("mapCvs");
    drawThingsMap("mapCanvas",obstacles);
  }
}

function drawThingsMap(elementID,obstacles) {
  var ctx = document.getElementById(elementID).getContext('2d');
  ctx.beginPath();
  ctx.save();

  drawObstaclesMap(ctx,obstacles);
  drawItemsMap(ctx);
}

//draws all obstacles (for now, just asteroids)
function drawObstaclesMap(ctx,obstacles) {
  //mapCvs = document.getElementById("map");
  obstacles.forEach(function (item)
  {
    if(item.visible){
      objName = item.constructor.name;
      ctx.beginPath();

      switch(objName)
      {
        case("Asteroid") : 
          ctx.fillStyle = "red";
          break;
        case("Celeron") : case("Xeon") : case ("Ryzen") : 
          //Write names on map too, to make sure we fulfill user story
          ctx.fillStyle = "blue";
          ctx.fillText(objName, (item.x/mapScale)/mapRatio + 5, (item.y/mapScale)/mapRatio);
          break;
        case("Planet") : 
          ctx.fillStyle = "blue";
          break;
        case("EnergyPotion") : 
          ctx.fillStyle = "green";
          break;
        case("Recipe") :
          ctx.fillStyle = "white";
          break;
      }

      ctx.fillRect((item.x/mapScale)/mapRatio, (item.y/mapScale)/mapRatio, 5, 5);

      ctx.closePath();
    }
  });

}

  //draws potions and recipe, etc
function drawItemsMap(ctx)
{
    //draw 1 potion
    
    //draw potion if array of items?
    //potion.forEach(function (p)
    //{
    //  if(confirmDraw(p.x, p.y))
    //  {
    //    ctx.drawImage(potion.sprite, p.x - ship.x, p.y - ship.y);
    //  }
    //});
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