function drawMapButton(){
	var cvs = document.getElementById("leftside");
  var test = document.getElementById("mapicon");
  if(!test){
    var element = document.createElement("button");
    element.id = "mapicon";
    element.name = "map";
    element.innerHTML = "test";
    element.value = "map.png";
    element.onclick = function() {
  	  showMap();
  	}
    element.style.right = GAME_SCREEN_WIDTH;
    cvs.appendChild(element);
  }else {
    test.style.right = GAME_SCREEN_WIDTH;
  }
}

function showMap(){
	alert("showmap");
}