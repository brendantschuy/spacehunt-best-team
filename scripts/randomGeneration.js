//randomgeneration.js

function generateRandomObstacles(input_x, input_y)
{
	table = new hashTable();
	randoms = [];
	let map_max_x = input_x;
	let map_max_y = input_y;

	//OBSTACLE_SPAWN_RATE is INVERSELY PROPORTIONAL to actual spawn rate
	//HIGHER constant = FEWER spawns
	for(i = 0; i < map_max_x / OBSTACLE_SPAWN_RATE; i++)
	{
		for(j = 0; j < map_max_y / OBSTACLE_SPAWN_RATE; j++)
		{
			for(k = 0; k < 8; k++)
			{
				let x = Math.floor(Math.random() * 16) + (i) * OBSTACLE_SPAWN_RATE + 1;//* i + 1;//+ OBSTACLE_SPAWN_RATE * i + 1;
				let y = Math.floor(Math.random() * 16) + (j) * OBSTACLE_SPAWN_RATE + 1;//* j + 1;//+ OBSTACLE_SPAWN_RATE * j + 1;
				if(table.addHash(x, y))	//hash prevents things spawning on top of each other
				{
					addRandomItem(x, y);
				}
				else
				{
					k--;
				}
			}
		}
	}

	//For each 16x16 square, create 4 asteroids, 1 planet, 1 meteorstorm, 1 freighter, 2 potions
	function addRandomItem(x, y)
	{
		let type = Math.floor(Math.random() * 10) + 1;
		switch(type)
		{
			case 5 : case 4 : case 3 : case 2 : case 1 : case 0 :
				randoms.push(new Asteroid(x, y));
				break;
			case 6 :
				randoms.push(new EnergyPotion(x, y, 200));
				break;
			case 7 :
				randoms.push(new Planet(x, y, Math.floor(Math.random() * 7) + 1));
				break;
			case 8 :
				randoms.push(new MeteorStorm(x, y));
				break;
			case 9 : 
				randoms.push(new AbandonedFreighter(x, y, 200, 200, 1000));
				break;
			case 10 :
				randoms.push(new BikeSkeleton(x, y));
				break;
		}
	}

	//Some items should only spawn rarely (recipe, space station)
	function generateFixedNumbers()
	{
		for(i = 0; i < 80; i++)
		{
			let randx = Math.floor(Math.random() * map_max_x);
			let randy = Math.floor(Math.random() * map_max_y);
			randoms.push(new SpaceStation(randx, randy));
		}
	}

	generateFixedNumbers();

	return randoms;
}