/*global Game*/

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */

// // Choose Random integer in a range
// function rand (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// var musicOn = true;


var wKey;
var aKey;
var sKey;
var dKey;
var currentColor;
var score;
var scoreText;

Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);

    this.nextWordIn = this.game.time.now;
    score = 0;

    // // Music
    // this.music = this.game.add.sound('music');
    // this.music.volume = 0.5;
    // this.music.play('',0,1,true);

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);

    //Placeholder Background
    var borderbmd = this.game.add.bitmapData(80, 80);
    borderbmd.ctx.rect(0, 0, 80, 80);
    borderbmd.ctx.fillStyle = '#fff'; //set a white backborder for the tile
    borderbmd.ctx.fill();
    borderbmd.ctx.beginPath();
    borderbmd.ctx.rect(0, 0, 20, 20);  
    borderbmd.ctx.rect(20, 40, 20, 20);
    // borderbmd.ctx.fillStyle = '#00bfff'; //blue
    borderbmd.ctx.fillStyle = '#000'; //blue
    borderbmd.ctx.fill();

    background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, borderbmd);
    // background.tileScale.set(4);
    background.tint = 0x444444;


    this.colorNames = ['Red', 'Blue', 'Green', 'Yellow'];
    this.colors = [0xff0000, 0x0000ff, 0x00ff00, 0xffff00];

    // currentColor = this.game.add.text(Game.w/2, Game.h/2, this.colorNames[game.rnd.integerInRange(0, 3)], {font: '128px Helvetica', fill: '#FFF', weight: 'bold'}); 

    // currentColor = this.game.add.bitmapText(Game.w/2, Game.h/2, 'akashi', this.colorNames[game.rnd.integerInRange(0, 3)], 128);
    // currentColor = this.game.add.bitmapText(Game.w/2, Game.h/2, 'akashi', '', 128);
    currentColor = this.game.add.bitmapText(Game.w/2, -128, 'akashi', '', 128);
    currentColor.anchor.setTo(0.5, 0.5);

    // currentColor.tint = this.colors[game.rnd.integerInRange(0,3)]

    scoreText = this.game.add.text(Game.w - 200, 48, 'Score: '+score, {font: '32px Helvetica', fill: '#FFF'});
    scoreText.anchor.setTo(0.5, 0.5);

    buttonSize = 64;

    //Placeholder Player
    buttonbmd = this.game.add.bitmapData(buttonSize, buttonSize);
    buttonbmd.ctx.strokeStyle = '#000';
    buttonbmd.ctx.rect(0, 0, buttonSize, buttonSize);
    buttonbmd.ctx.fillStyle = '#fff';
    buttonbmd.ctx.fill();

    this.red = this.game.add.button(Game.w/2-222, Game.h-buttonSize-64, buttonbmd, this.actionOnClick);
    this.red.tint = 0xff0000;  
    this.red.name = 'red';  

    this.blue = this.game.add.button(Game.w/2-96, Game.h-buttonSize-64, buttonbmd, this.actionOnClick);
    this.blue.tint = 0x0000ff;  
    this.blue.name = 'blue';  

    this.green = this.game.add.button(Game.w/2 + 32, Game.h-buttonSize-64, buttonbmd, this.actionOnClick);
    this.green.tint = 0x00ff00;  
    this.green.name = 'green';  

    this.yellow = this.game.add.button(Game.w/2+160, Game.h-buttonSize-64, buttonbmd, this.actionOnClick);
    this.yellow.tint = 0xffff00;  
    this.yellow.name = 'yellow';  

  },
  updateColor: function(interval) {
   if (this.game.time.now > this.nextWordIn + interval) {
    this.nextWordIn = this.game.time.now + interval;
     
    currentColor.setText(this.colorNames[game.rnd.integerInRange(0,3)]);
    currentColor.tint = this.colors[game.rnd.integerInRange(0,3)]
    currentColor.y = -128;

    var t = this.game.add.tween(currentColor)
      .to({y: Game.h/2}, interval, Phaser.Easing.Quadratic.InOut)
      .to({y: Game.h+128}, interval, Phaser.Easing.Quadratic.InOut)
      .start();
   }

  },
  actionOnClick: function(btn) {
    console.log(btn.name +' '+ currentColor.text);
    if (btn.name === currentColor.text.toLowerCase()) {
      score += 1;
      scoreText.setText('Score: ' + score);
    }

  },
  update: function() {

    this.updateColor(1000);

    // // Toggle Music
    // muteKey.onDown.add(this.toggleMute, this);

  },
  // toggleMute: function() {
  //   if (musicOn == true) {
  //     musicOn = false;
  //     this.music.volume = 0;
  //   }else {
  //     musicOn = true;
  //     this.music.volume = 0.5;
  //   }
  // },
  // render: function() {
  //   game.debug.text('Health: ' + tri.health, 32, 96);
  // }

};
