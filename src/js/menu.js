/*global Game*/
Game.Menu = function(game){
  this.game = game;
};

Game.Menu.prototype =  {
    create: function() {

        this.titleText = this.game.add.bitmapText(Game.w/2, Game.h/2, 'akashi', "Against Type", 64 );
        this.titleText.anchor.setTo(0.5, 0.5);

        this.redText = this.game.add.bitmapText(Game.w/5, Game.h/2+100, 'akashi', "red", 24 );
        this.redText.anchor.setTo(0.5, 0.5);
        this.redText.tint = 0x0000ff;

        this.blueText = this.game.add.bitmapText(Game.w/5*2, Game.h/2+100, 'akashi', "blue", 24 );
        this.blueText.anchor.setTo(0.5, 0.5);
        this.blueText.tint = 0xff0000;

        this.greenText = this.game.add.bitmapText(Game.w/5*3, Game.h/2+100, 'akashi', "green", 24 );
        this.greenText.anchor.setTo(0.5, 0.5);
        this.greenText.tint = 0xffff00;

        this.yellowText = this.game.add.bitmapText(Game.w/5*4, Game.h/2+100, 'akashi', "yellow", 24 );
        this.yellowText.anchor.setTo(0.5, 0.5);
        this.yellowText.tint = 0x00ff00;

        this.clickText = this.game.add.bitmapText(Game.w/2, Game.h/2 + 200, 'akashi', "click to start", 24 );
        this.clickText.anchor.setTo(0.5, 0.5);

        // Start Message
        var text = this.game.add.text(Game.w/2, Game.h/2-50, '~click to start~', { font: '30px Helvetica', fill: '#000' });
        text.anchor.setTo(0.5, 0.5);

    },
    update: function() {
      //Click to Start
      if (this.game.input.activePointer.isDown){
        this.game.state.start('Play');
      }
    }
};
