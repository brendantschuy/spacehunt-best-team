//randomgeneration.js

function generateRandomObstacles()
{
	randoms = [];



	for(i = 1; i < MAP_MAX_X / 16; i++)
	{
		for(j = 1; j < MAP_MAX_Y / 16; j++)
		{
			//for each 16x16 square, push 4 asteroids
			//1 planet
			//1 meteor storm
			//1 abandoned freighter
			//2 energy potions
			randoms.push(new Asteroid(Math.floor(Math.random() * 16) * i + 1, Math.floor(Math.random() * 16) * j + 1));
			randoms.push(new Asteroid(Math.floor(Math.random() * 16) * i + 1, Math.floor(Math.random() * 16) * j + 1));
			randoms.push(new Asteroid(Math.floor(Math.random() * 16) * i + 1, Math.floor(Math.random() * 16) * j + 1));
			randoms.push(new Asteroid(Math.floor(Math.random() * 16) * i + 1, Math.floor(Math.random() * 16) * j + 1));
			randoms.push(new Planet(Math.floor(Math.random() * 16) * i, Math.floor(Math.random() * 16) * j, Math.floor(Math.random() * 7) + 1));
			randoms.push(new MeteorStorm(Math.floor(Math.random() * 16) * i, Math.floor(Math.random() * 16) * j));
			randoms.push(new AbandonedFreighter(Math.floor(Math.random() * 16) * i, Math.floor(Math.random() * 16) * j));
			randoms.push(new EnergyPotion(Math.floor(Math.random() * 16) * i + 1, Math.floor(Math.random() * 16) * j ) + 1, 200);
			randoms.push(new EnergyPotion(Math.floor(Math.random() * 16) * i + 1, Math.floor(Math.random() * 16) * j) + 1, 200);
		}
	}







	return randoms;
}