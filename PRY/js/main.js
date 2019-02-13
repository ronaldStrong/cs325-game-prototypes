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
    }
    
    var fskey;
    var desktop;
    var cow;
    function create() {
        desktop=game.add.sprite(0,0,'desktop1');
        desktop.anchor.setTo(.5,.5);

        cow=game.add.sptite(700,350,'cow');
        cow.alignIn(desktop, Phaser.BOTTOM_RIGHT);        
        
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        fskey = game.input.keyboard.addKey(Phaser.Keyboard.F10);
        fskey.onDown.add(gofull, this);        
        
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
    function update() {
        

    }
};
