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
			//let sound = new Audio("audio/" + soundName);
			let sound = new Audio();
			sound.src = "audio/" + soundName;
			sound.play();
			this.playing = true;
			setTimeout(function()
			{
				this.playing = false;
				sound.pause();
				sound.currentTime = 0;
			}, 1200000);
		}

		return;
	}
}