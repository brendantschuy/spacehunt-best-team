//norepeats.js

//uses hash table to make sure there aren't any repeats

class hashTable
{
	constructor()
	{
		this.table = [];
	}

	//generates key using x & y values
	findKey(x, y)
	{
		return x * 129 + y;
	}

	//if the hash already exists in the table, don't add anything else here
	//if it doesn't exist, then return true, but mark that value with something.
	addHash(x, y)
	{
		let key = this.findKey(x, y);
		if(key == 0 || key == 8320)
		{
			return false;
		}
		if(this.table[key])
		{
			return false;
		}
		else
		{
			this.table[key] = 1;
			return true;
		}
	}
}