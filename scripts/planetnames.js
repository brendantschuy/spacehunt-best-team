function randomPlanetName()
{
	listOfNames = ["Coruscant", "Tatooine", "Naboo", "Hoth", "Geonosis", "Kamino", "Mustafar", "Alderaan", "Trantor", "Terminus", "Gaia", "Caladan",
		"Corrin", "Arrakis", "Dakara", "Lantea", "Earth"];

	index = Math.floor(Math.random() * listOfNames.length);

	return listOfNames[index];
}