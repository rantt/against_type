var Game = {
  w: 640,
  h: 980 
};


if (localStorage.getItem('atHighestScore') === null) {
  localStorage.setItem('atHighestScore', 0);
}

if (localStorage.getItem('atHighestCombo') === null) {
  localStorage.setItem('atHighestCombo', 0);
}


Game.Boot = function(game) {
  this.game = game;
};

Game.Boot.prototype = {
  preload: function() {
		this.game.stage.backgroundColor = '#000';
		this.game.load.image('loading', 'assets/images/loading.png');
		this.game.load.image('title', 'assets/images/title.png');
		this.game.load.image('instructions', 'assets/images/instructions.png');

    //Automatically Scale to fit available screen
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.maxHeight = window.innerHeight;
    this.game.scale.maxWidth = window.innerHeight*(Game.w/Game.h);

    this.game.stage.scale.pageAlignHorizontally = true;
    this.game.stage.scale.pageAlignVeritcally = true;
    this.game.scale.setScreenSize(true);

  },
  create: function() {
   this.game.state.start('Load');
  }
};

Game.Load = function(game) {
  this.game = game;
};

Game.Load.prototype = {
  preload: function() {
    
    //Debug Plugin
    // this.game.add.plugin(Phaser.Plugin.Debug);

    //Loading Screen Message/bar
    var loadingText = this.game.add.text(Game.w, Game.h, 'Loading...', { font: '30px Helvetica', fill: '#fff' });
  	loadingText.anchor.setTo(0.5, 0.5);
  	// var preloading = this.game.add.sprite(Game.w/2-64, Game.h/2+50, 'loading');
  	var preloading = this.game.add.sprite(Game.w/2, Game.h/2, 'loading');
    preloading.anchor.setTo(0.5, 0.5);
    preloading.tint = 0xff0000;
  	this.game.load.setPreloadSprite(preloading);

    this.game.load.bitmapFont('akashi', 'assets/fonts/akashi/akashi.png', 'assets/fonts/akashi/akashi.fnt');

    this.game.load.image('twitter','assets/images/twitter.png');

    // this.game.load.spritesheet('hearts', 'assets/images/hearts.png', 31, 31, 6);
    this.game.load.atlasXML('hearts','assets/images/hearts.png','assets/atlas/hearts.xml');
    this.game.load.audio('boom', 'assets/audio/boom.wav');
    this.game.load.audio('miss', 'assets/audio/miss.wav');

    // Music Track
    this.game.load.audio('music',['assets/audio/sky.ogg','assets/audio/sky.mp3']);

  },
  create: function() {
    this.game.state.start('Menu');
  }
};
