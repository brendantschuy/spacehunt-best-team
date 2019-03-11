//randomgeneration.js

function generateRandomObstacles(input_x, input_y)
{
	table = new hashTable();
	randoms = [];
	let map_max_x = input_x;
	let map_max_y = input_y;

	for(i = 1; i < map_max_x / 8; i++)
	{
		for(j = 1; j < map_max_y / 8; j++)
		{
			for(k = 0; k < 8; k++)
			{
				let x = Math.floor(Math.random() * 16) * i + 1;
				let y = Math.floor(Math.random() * 16) * j + 1;
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
		let type = Math.floor(Math.random() * 9) + 1;
		switch(type)
		{
			case 4 : case 3 : case 2 : case 1 :
				randoms.push(new Asteroid(x, y));
				break;
			case 5 : case 6 : 
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
		}
	}

	return randoms;
}