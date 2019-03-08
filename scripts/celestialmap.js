var mapRatio = 1;   //increases for smaller screen resolution
var mapScale = 32;  //ratio of px on game to px on map
var map_y = 20;
var map_x = 20;

//Creates map
function createMap()
{
  var mapCvs = document.createElement("canvas");
  mapCvs.id = "mapCanvas";
  var mapCtx = mapCvs.getContext('2d');

  mapCvs.height = 446;
  mapCvs.width = 300;

  mapCtx.fillStyle = "RGBA(100, 100, 100, 0.3)";
  mapCtx.fillRect(0, 0, mapCvs.width, mapCvs.height);

  //Determines where to put map canvas. Depends on screen resolution.
  // Currently only have 1 style sheet
  /*var largeMap = document.getElementById("widescreenOnly");

  if(window.getComputedStyle(largeMap).display === "none")
  {
    document.getElementById("dev-buttons").appendChild(mapCvs);
  }
  else
  {
    //document.getElementById("dev").appendChild(mapCvs);
    document.getElementById("map-div").appendChild(mapCvs);
  }*/

  document.getElementById("map-div").appendChild(mapCvs);
}

//Updates map
function updateMap(obstacles)
{
  let ctx = document.getElementById("mapCanvas").getContext('2d');
  ctx.beginPath();
  ctx.save();
  obstacles.forEach(function (item)
  {
    if(item.visible && item.addToMap){
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
          objName = item.planetName; 
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

      item.addToMap = false;

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