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
    desktop = function (game, image, gameWorldMinX, gameWorldMinY, gameworldMaxX, gameWorldMaxY) {

        //  We call the Phaser.Sprite passing in the game reference
        //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
        Phaser.Sprite.call(this, game, gameWorldx, gameWorldy, image);
        var border = game.add.graphics(gameWorldx,gameWorldy);
        var MinX=gameWorldMinX;
        var MaxX=gameworldMaxX;
        var MinY=gameWorldMinY;
        var MaxY=gameWorldMaxY;
        this.anchor.setTo(0.5, 0.5);
        
        game.add.existing(this);
        var icons= [];
        var iconsIndex=0;
        var apps =[];
        var appsIndex=0;
        function startApp(app) {
            apps[appsIndex]=app;
            appsIndex++;
            //add task box
        }
        function endApp(app){
            
        }
    };
    desktop.prototype = Object.create(Phaser.Sprite.prototype);
    desktop.prototype.constructor = desktop;
    
    desktop.prototype.update = function() {
    
        //  Automatically called by World.update
        
    
    };
    app = function (game, image, gameWorldMinX, gameWorldMinY, gameworldMaxX, gameWorldMaxY) {

        //  We call the Phaser.Sprite passing in the game reference
        //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
        Phaser.Sprite.call(this, game, gameWorldx, gameWorldy, image, desktop);
        var border = game.add.graphics(gameWorldx,gameWorldy);
        var MinX=gameWorldMinX;
        var MaxX=gameworldMaxX;
        var MinY=gameWorldMinY;
        var MaxY=gameWorldMaxY;

        border.beginFill(0xFFFFFF);
        border.lineStyle(4, 0xC0C0C0, 1);
    
        border.moveTo(gameWorldMinX, gameWorldMinY);
        border.lineTo(gameworldMaxX, gameWorldMinY);
        border.lineTo(gameworldMaxX, gameWorldMaxY);
        border.lineTo(gameWorldMinX, 100);
        border.lineTo(0, 200);
        border.lineTo(0, 0);
        border.endFill();

        border.addChild(this);
        this.anchor.setTo(0.5, 0.5);
        
        game.add.existing(this);
    };
    app.prototype = Object.create(Phaser.Sprite.prototype);
    app.prototype.constructor = app;
    
    app.prototype.update = function() {
    
        //  Automatically called by World.update
        
    
    };
    var game = new Phaser.Game( 960, 644, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'desktop1', 'assets/background.jpg' );
        game.load.image( 'cow', 'assets/cow.png' );
    }
    
    var fskey;
    var desktop;
    var cow;
    function create() {
        desktop=game.add.sprite(0,0,'desktop1');''
        desktop.anchor.setTo(.5,.5);''
        cow=game.add.sptite(700,350,'cow');
        cow.alignIn(desktop, Phaser.BOTTOM_RIGHT);            
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        fskey = game.input.keyboard.addKey(Phaser.Keyboard.F11);
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
