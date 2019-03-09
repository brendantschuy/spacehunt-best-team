var mapRatio = 1;   //increases for smaller screen resolution
var mapScale = 32;  //ratio of px on game to px on map
var map_y = 20;
var map_x = 20;

//Updates map
function updateMap(obstacles)
{
  obstacles.forEach(function (item)
  {
    if(item.visible && item.addToMap){
      let newMapItem = document.createElement("p");
      if(item.constructor.name == "Planet")
      {
        newMapItem.appendChild(document.createTextNode(item.planetName + ": (" + item.cpx + ", " + item.cpy + ")"));
      }
      else
      {
        newMapItem.appendChild(document.createTextNode(item.constructor.name + ": (" + item.cpx + ", " + item.cpy + ")"));
      }
      newMapItem.className = "mapItems";
      document.getElementById("map-container-div").appendChild(newMapItem);
      item.addToMap = false;
    }
  });
}