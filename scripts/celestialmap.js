var mapRatio = 1;   //increases for smaller screen resolution
var mapScale = 32;  //ratio of px on game to px on map

function showMap(obstacles){
  var test = document.getElementById("mapCanvas");
  if(!test){
    var themap = document.createElement("canvas");
    themap.id = "mapCanvas";
    var map = themap.getContext('2d');

    //WIP: Trying to get map to work better at lower screen resolution
    if(window.screen.availWidth < 1367)
    {
      mapRatio = 1.5;
    }

    //map.fillStyle = "red";
    //map.fillRect(0, 0, 300, 300);
    themap.height = (MAP_HEIGHT * GRID_SIZE)/mapRatio/1.1; //581 px or 387 px, depending on screen res
    themap.width = (MAP_WIDTH * GRID_SIZE)/mapRatio/1.1;   //581 px or 387 px, depending on screen res

    map.fillStyle = "RGBA(100, 100, 100, 0.3)";
    map.fillRect(0, 0, themap.height, themap.width);


    //themap.style.left = 29.5;
    //themap.style.top = -3.5;
    //document.getElementById("map").style.backgroundSize = themap.height + "px " +  themap.width + "px";
    //var backgroundImage = new Image();
    //backgroundImage.src = "img/parchment.jpg";
    //map.drawImage(backgroundImage, 0, 0);

    //context.fillRect(0, 0, canvas.width, canvas.height);
    
    //themap.style.position = "relative";
    //themap.style.left = (MAP_WIDTH * GRID_SIZE)/3.5;
    //themap.style.top = (MAP_HEIGHT * GRID_SIZE)/2.5;
    //map.beginPath();
    //map.save();
    //map.translate(SHIP_ABS_X, SHIP_ABS_Y); 
    var largeMap = document.getElementById("widescreenOnly");
    if(window.getComputedStyle(largeMap).display === "none")
    {
      document.getElementById("dev-buttons").appendChild(themap);
    }
    else
    {
      document.getElementById("dev").appendChild(themap);
    }
    //document.getElementById("dev").appendChild(themap);
    //drawGridMap("theMap");

    drawThingsMap("mapCanvas",obstacles);   

  }else {
    //switchVisibility("theMap");
    drawThingsMap("mapCanvas",obstacles);
  }
}

//Never actually called:
/*function drawGridMap(elementID) {
    var ctx = document.getElementById(elementID).getContext('2d');

    //creates backdrop (opacity = 0.4 so it is see-through)
      ctx.fillStyle = "RGBA(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);

      ctx.beginPath();    //reduces lag       
      ctx.strokeStyle = "white";
      for(w = 0; w < GAME_SCREEN_WIDTH; w += GRID_SIZE/2)
      {
          for(h = 0; h < GAME_SCREEN_HEIGHT; h += GRID_SIZE/2)
          {
              //draws line every 128 px in either direction
              ctx.moveTo(w, 0.5);
              ctx.lineTo(w, GAME_SCREEN_WIDTH);
              ctx.stroke();
              ctx.moveTo(0.5, h);
              ctx.lineTo(GAME_SCREEN_HEIGHT, h);
              ctx.stroke();
          }
      }
      ctx.closePath();
  }*/

function drawThingsMap(elementID,obstacles) {
  var ctx = document.getElementById(elementID).getContext('2d');
  ctx.beginPath();
  ctx.save();

  drawObstaclesMap(ctx,obstacles);
  drawItemsMap(ctx);
}

//draws all obstacles (for now, just asteroids)
function drawObstaclesMap(ctx,obstacles) {
  //themap = document.getElementById("map");
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

      //alert(rock.x/mapScale/mapRatio + " and " + rock.y/mapScale/mapRatio);
      ctx.fillRect((item.x/mapScale)/mapRatio,(item.y/mapScale)/mapRatio,5,5);

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