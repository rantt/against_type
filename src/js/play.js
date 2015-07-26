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
var combo = 0;
var level_names = [
                    'easy does it',
                    'Pretty Good :)',
                    '$#!^, got real!',
                    'TOO FAST!!',
                    'THE CHOSEN ONE!'
                    ];
var level = 0;
var speed = 1000;
var experience = 0;
var nextLevel = 1000;
var chosen = false;
var life = 4;
var showInstructions = true;

Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);

    this.nextWordIn = this.game.time.now;
    score = 0;

    // // Music
    this.music = this.game.add.sound('music');
    this.music.volume = 0.5;
    this.music.play('',0,1,true);

    this.boomSnd = this.game.add.sound('boom');
    this.boomSnd.volume = 0.5;


    this.missSnd = this.game.add.sound('miss');
    this.missSnd.volume = 0.5;

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);

    //Placeholder Background
    var borderbmd = this.game.add.bitmapData(80, 80);
    borderbmd.ctx.rect(0, 0, 80, 80);
    borderbmd.ctx.fillStyle = '#dcdcdc'; //set a white backborder for the tile
    borderbmd.ctx.fill();
    borderbmd.ctx.beginPath();
    borderbmd.ctx.rect(0, 0, 20, 20);  
    borderbmd.ctx.rect(20, 40, 20, 20);
    borderbmd.ctx.fillStyle = '#fff'; //blue
    borderbmd.ctx.fill();

    background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, borderbmd);
    // background.tileScale.set(4);

    background.tint = 0x555555;


    this.colorNames = ['Red', 'Blue', 'Green', 'Yellow'];
    this.colors = [0xff0000, 0x0000ff, 0x00ff00, 0xffff00];

    currentColor = this.game.add.bitmapText(Game.w/2, -128, 'akashi', '', 128);
    currentColor.anchor.setTo(0.5, 0.5);

    this.scoreText = this.game.add.bitmapText(Game.w - 100, 48,'akashi', 'Score: '+ score,32); 
    this.scoreText.anchor.setTo(0.5, 0.5);

    this.comboText = this.game.add.bitmapText(Game.w - 100, 96,'akashi', 'X' + combo,64); 
    this.comboText.anchor.setTo(0.5, 0.5);
    this.comboText.alpha = 0;
    this.comboText.tint = 0xff0000;

    this.lvlText = this.game.add.bitmapText(32, 32, 'akashi', 'Lvl: '+ level_names[level], 32); 

    this.instructionText = this.game.add.bitmapText(Game.w/2, Game.h/2, 'akashi', "Click the button that's the same color as the\n word that appears on the screen...easy...right?\n\nClick To Continue", 24);
    this.instructionText.anchor.setTo(0.5, 0.5);

    buttonSize = 64;

    //Placeholder Player
    buttonbmd = this.game.add.bitmapData(buttonSize, buttonSize);
    buttonbmd.ctx.strokeStyle = '#000';
    buttonbmd.ctx.rect(0, 0, buttonSize, buttonSize);
    buttonbmd.ctx.fillStyle = '#fff';
    buttonbmd.ctx.fill();

    this.red = this.game.add.sprite(Game.w/5, Game.h-buttonSize-64, buttonbmd);
    this.red.anchor.setTo(0.5, 0.5);
    this.red.inputEnabled = true;
    this.red.events.onInputDown.add(this.actionOnClick, this);
    this.red.tint = 0xff0000;  
    this.red.name = 'red';  

    this.blue = this.game.add.sprite(Game.w/5*2, Game.h-buttonSize-64, buttonbmd);
    this.blue.anchor.setTo(0.5, 0.5);
    this.blue.inputEnabled = true;
    this.blue.events.onInputDown.add(this.actionOnClick, this);
    this.blue.tint = 0x0000ff;  
    this.blue.name = 'blue';  

    this.green = this.game.add.sprite(Game.w/5*3, Game.h-buttonSize-64, buttonbmd);
    this.green.anchor.setTo(0.5, 0.5);
    this.green.inputEnabled = true;
    this.green.events.onInputDown.add(this.actionOnClick, this);
    this.green.tint = 0x00ff00;  
    this.green.name = 'green';  

    this.yellow = this.game.add.sprite(Game.w/5*4, Game.h-buttonSize-64, buttonbmd);
    this.yellow.anchor.setTo(0.5, 0.5);
    this.yellow.inputEnabled = true;
    this.yellow.events.onInputDown.add(this.actionOnClick, this);
    this.yellow.tint = 0xffff00;  
    this.yellow.name = 'yellow';  

    this.debris = this.game.add.bitmapData(20, 20);
    this.debris.ctx.strokeStyle = '#000';
    this.debris.ctx.rect(0, 0, 20, 20);
    this.debris.ctx.fillStyle = '#fff';
    this.debris.ctx.fill();

    this.emitter = this.game.add.emitter(0, 0, 100);
    this.emitter.makeParticles(this.debris);
    this.emitter.gravity = 500;
    this.emitter.minParticleSpeed.setTo(-200, -200);
    this.emitter.maxParticleSpeed.setTo(200, 200);
 
    this.heartGauge = [
                        this.game.add.sprite(32, 80,'hearts'),
                        this.game.add.sprite(96, 80,'hearts'),
                        this.game.add.sprite(160, 80,'hearts'),
                        this.game.add.sprite(224, 80,'hearts')
                      ]
    this.drawLife();


  },
  drawLife: function() {
    for(var i = 0; i < 4;i++) {
     if (i < life) {
       this.heartGauge[i].frame = i;
     }else {
       this.heartGauge[i].frame = 4;
     }
    }
  },
  updateColor: function(interval) {
   if (this.game.time.now > this.nextWordIn + interval) {
    currentColor.alpha = 1;
    this.nextWordIn = this.game.time.now + interval;
     
    currentColor.setText(this.colorNames[game.rnd.integerInRange(0,3)]);
    currentColor.tint = this.colors[game.rnd.integerInRange(0,3)];
    currentColor.y = -128;

    var t = this.game.add.tween(currentColor)
      .to({y: Game.h/2}, interval, Phaser.Easing.Quadratic.InOut)
      .to({y: Game.h+128}, interval, Phaser.Easing.Quadratic.InOut)
      .start();

    t.onComplete.add(function() {
      if (chosen === false) {
        life -= 1;
        combo = 0;
        this.game.add.tween(this.comboText)
          .to({alpha: 0}, 300).start();

        this.drawLife();
        this.missSnd.play();
      }
      chosen = false;
    },this);
   }

  },
  actionOnClick: function(btn) {
    var t = this.game.add.tween(btn)
      .to({angle: 180}, 300)
      .start();

    if (btn.name === currentColor.text.toLowerCase() && chosen === false) {
      console.log(btn.name + ' ' + currentColor.text.toLowerCase() + ' '+chosen);
      this.boomSnd.play();
      currentColor.alpha = 0;
      
      this.emitter.forEach(function(particle) {
          // tint every particle to match the selected color 
          particle.tint = btn.tint;
      });
      this.emitter.x = currentColor.x;
      this.emitter.y = currentColor.y;
      this.emitter.start(true, 1000, null, 256);


      chosen = true; //so the player can't spam the color to ramp up the points

      combo += 1; //the more the player get's right in a row the higher the points
      score +=  10 * combo;
      this.scoreText.setText('Score: ' + score);

      this.comboText.setText('X'+combo);
      this.game.add.tween(this.comboText)
        .to({alpha: 1}, 500).start();

    }else {
      this.missSnd.play();
      chosen = true;
      life -= 1;
      combo = 0;

      this.comboText.setText('X'+combo);
      this.game.add.tween(this.comboText)
        .to({alpha: 0}, 500).start();
    }


    this.drawLife();

  },
  update: function() {

    if (showInstructions === true) {
      if (this.game.input.activePointer.isDown) {
        showInstructions = false;
        this.instructionText.setText('');
      }
    }else {
      if (score >= nextLevel) {
        if (level < 5) {
          nextLevel *= 2;
          speed -= 100;
          level += 1;
          life = 4; //restore life on new level
          this.lvlText.setText('Lvl: '+level_names[level]);
          switch (level) {
            case 0:
              this.lvlText.tint = 0xFFFFFF;
              break;
            case 1:
              this.lvlText.tint = 0x00ff00;
              break;
            case 2:
              this.lvlText.tint = 0x0000ff;
              break;
            case 3:
              this.lvlText.tint = 0xffff00;
              break;
            case 4:
              this.lvlText.tint = 0xff0000;
              break;
          }
        }
      }
      this.updateColor(speed);
    }
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
    // game.debug.text('Streak: ' + combo, 32, 96);
    // game.debug.text('Level: ' + level_names[level], 32, 32);
    // game.debug.text('Speed: ' + speed, 32, 64);
    // game.debug.text('Lives: ' + life, 32, 112);
    // game.debug.text('Chosen: ' + chosen, 32, 124);
  // }

};
