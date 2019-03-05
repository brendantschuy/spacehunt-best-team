//musicplayer.js

class MusicPlayer
{
	constructor()
	{
		this.playing = false;
	}

	//facilitates music playing
	//make sure to include file extension in soundName
	playMusic(soundName)
	{
		if(!this.playing)
		{
			var sound = new Audio("audio/" + soundName);
			sound.play();
			this.playing = true;
			setTimeout(function()
			{
				this.playing = false;
			}, 10000);
		}
	}
}