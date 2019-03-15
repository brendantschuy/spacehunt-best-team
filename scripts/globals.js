//globals.js

//============================================================
//------------------Constant Parameters-----------------------
const GRID_SIZE = 128;		//edit to change grid/CP resolution
const ANGLE_INCREMENT = 90;		//edit to change what angles we can turn
const MAP_WIDTH = 5;				//how many squares across is map?
const MAP_HEIGHT = 5;				//how many squares tall is map?
const GAME_SCREEN_WIDTH = GRID_SIZE * MAP_WIDTH;		//dimensions of game screen
const GAME_SCREEN_HEIGHT = GRID_SIZE * MAP_HEIGHT;		//dimensions of game screen
const SHIP_WIDTH = 54;		//dimensions of image
const SHIP_HEIGHT = 98;		//dimensions of image
const SHIP_SPEED = GRID_SIZE / 32;
const SHIP_ABS_X = GRID_SIZE * 2.5;		//absolute position of ship on screen (shouldn't change)
const SHIP_ABS_Y = GRID_SIZE * 2.5;		//absolute position of ship on screen (shouldn't change)
const SCAN_RANGE = 2;		//how far can we see when we hit scan?
const SHIP_START_X = 0;	//starting position in cpx
const SHIP_START_Y = 0;	//starting position in cpy
ACTIVE_GAME = false;    // Cannot be a const value

const OBSTACLE_SPAWN_RATE = 4;	//lower is more

//map dimensions:
const MAP_MIN_X = 0;
const MAP_MAX_X = 128;
const MAP_MIN_Y = 0;	
const MAP_MAX_Y = 128;
const MAP_LENGTH_X = MAP_MAX_X - MAP_MIN_X;
const MAP_LENGTH_Y = MAP_MAX_Y - MAP_MIN_Y;
//============================================================