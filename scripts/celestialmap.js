function showMap(obstacles){
  var test = document.getElementById("mapCanvas");
  if(!test){
    var themap = document.createElement("canvas");
    themap.id = "mapCanvas";
    var map = themap.getContext('2d');
    themap.height = (MAP_HEIGHT * GRID_SIZE)/1.1;
    themap.width = (MAP_WIDTH * GRID_SIZE)/1.1;
    themap.style.left = 29.5;
    themap.style.top = -3.5;
    document.getElementById("map").style.backgroundSize = themap.height + "px " +  themap.width + "px";
    //var backgroundImage = new Image();
    //backgroundImage.src = "img/parchment.jpg";
    //map.drawImage(backgroundImage, 0, 0);
    //map.fillStyle = "img/parchment.jpg";
    //map.fillRect(0, 0, 640, 480);
    //context.fillRect(0, 0, canvas.width, canvas.height);
    
    themap.style.position = "relative";
    //themap.style.left = (MAP_WIDTH * GRID_SIZE)/3.5;
    //themap.style.top = (MAP_HEIGHT * GRID_SIZE)/2.5;
    //map.beginPath();
    //map.save();
    //map.translate(SHIP_ABS_X, SHIP_ABS_Y); 
    document.getElementById("map").appendChild(themap);
    //drawGridMap("theMap");
    drawThingsMap("mapCanvas",obstacles);   

  }else {
    //switchVisibility("theMap");
    drawThingsMap("mapCanvas",obstacles);
  }
}

function drawGridMap(elementID) {
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
    obstacles.forEach(function (rock)
      {
        if(!rock.visible){
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.fillRect(rock.x/(128/4),rock.y/(128/4),5,5);
          ctx.strokeStyle = "red";
          ctx.stroke();
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