//norepeats.js

//uses hash table to make sure there aren't any repeats

class hashTable
{
	table = [];

	findKey(x, y)
	{
		return x * 129 + y;
	}

	addHash(x, y)
	{
		let key = this.findKey(x, y);
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