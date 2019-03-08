//randomgeneration.js

function generateRandomObstacles()
{
	table = new hashTable();
	randoms = [];

	for(i = 1; i < MAP_MAX_X / 8; i++)
	{
		for(j = 1; j < MAP_MAX_Y / 8; j++)
		{
			//for each 16x16 square, push 4 asteroids
			//1 planet
			//1 meteor storm
			//1 abandoned freighter
			//2 energy potions
			//add 1 to each item so you don't spawn on top of anything
			for(k = 0; k < 8; k++)
			{
				let x = Math.floor(Math.random() * 16) * i + 1;
				let y = Math.floor(Math.random() * 16) * j + 1;
				if(table.addHash(x, y))
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

	function addRandomItem(x, y)
	{
		let type = Math.floor(Math.random() * 9) + 1;
		switch(type)
		{
			case 4 : case 3 : case 2 : case 1 :
				randoms.push(new Asteroid(x, y));
				break;
			case 5 : case 6 : 
				randoms.push(new EnergyPotion(x, y));
				break;
			case 7 :
				randoms.push(new Planet(x, y, Math.floor(Math.random() * 7) + 1));
				break;
			case 8 :
				randoms.push(new MeteorStorm(x, y));
				break;
			case 9 : 
				randoms.push(new AbandonedFreighter(x, y));
				break;
		}
	}

	return randoms;
}