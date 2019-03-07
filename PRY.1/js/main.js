"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 960, 644, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'desktop1', 'assets/background.jpg' );
        game.load.image( 'cow', 'assets/cow.png' );
        game.load.image('pry', 'assets/4x/Pry@4x.png');
        game.load.audio('rudemoo','assets/rudemoo.mp3');
        game.load.audio('moo','assets/moo.mp3')
    }
    
    var fskey;
    var deskt;
    var cow;
    var moos=0;
    var moo;
    var rudemoo;
    function create() {
        deskt=game.add.sprite(0,0,'desktop1')
        deskt.alignIn(game.world.bounds,Phaser.CENTER);
        cow=game.add.sprite(700,350,'cow');
        cow.alignIn(deskt, Phaser.BOTTOM_RIGHT,-100,-100);
        cow.inputEnabled=true;
        cow.input.useHandCursor = true;
        cow.events.onInputDown.add(cowPress, this);          
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        fskey = game.input.keyboard.addKey(Phaser.Keyboard.F11);
        fskey.onDown.add(gofull, this);
        moo=game.add.audio('moo');
        rudemoo= game.add.audio('rudemoo')        
        //fx = game.add.audio('sfx');

    }
    function gofull() {

        if (game.scale.isFullScreen)
        {
            game.scale.stopFullScreen();
        }
        else
        {
            game.scale.startFullScreen(false);
        }
    
    }
    function pryStart(){
        pry=game.add.sprite(game.world.centerX,game.world.centerY,'pry');
        pry.alignIn(cow, Phaser.TOP_LEFT);
        cow.destroy()

    }
    function cowPress(){
        moos++;
        if (moos===1){
            moo.play();
        }
        else if (moos===2 && ! moo.isPlaying()){
            rudemoo.play();
        }
        else if (moos===3&&! moo.isPlaying()&& ! rudemoo.isPlaying()){
            pryStart();
            
        } 
    }
    function update() {
        

    }
};
