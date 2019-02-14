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
        var buttonArray=[]
        this.anchor.setTo(0.5, 0.5);
        
        game.add.existing(this);
        var icons= [];
        var iconsIndex=0;
        var apps =[];
        var appsIndex=0;
        function startApp(app) {
            apps[appsIndex]=app;
            buttonArray[appsIndex]=game.make.sprite(0, 0,);
            buttonArray[appsIndex].alignIn(this,Phaser.BOTTOM_LEFT);
            if(appsIndex!==0){
                buttonArray[appsIndex].alignTo(--buttonArray[appsIndex], Phaser.RIGHT_CENTER, 5);
            }
            barButton.inputEnabled = true;
            barButton.input.priorityID = 1;
            barButton.input.useHandCursor = true;
            barButton.events.onInputDown.add(app.awake(), this);
            appsIndex++;
        }
        function endApp(app){
            let found = false;
            for( let a of apps ) {
                if((a===app)&&(found===false)){
                    buttonArray[apps.indexOf(app)].destroy();
                    a.destroy();
                }
            }
        }
    };
    desktop.prototype = Object.create(Phaser.Sprite.prototype);
    desktop.prototype.constructor = desktop;
    
    desktop.prototype.update = function() {
    
        //  Automatically called by World.update
        
    
    };
    app = function (game, image, gameWorldMinX, gameWorldMinY, gameworldMaxX, gameWorldMaxY, desktop) {

        //  We call the Phaser.Sprite passing in the game reference
        //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
        Phaser.Sprite.call(this, game, gameWorldMinX, gameWorldMiny, image, desktop);
        var border = game.add.graphics(gameWorldx,gameWorldy);
        this.inputEnabled = true;
        this.input.enableDrag();
        var MinX=gameWorldMinX;
        var MaxX=gameworldMaxX;
        var MinY=gameWorldMinY;
        var MaxY=gameWorldMaxY;
        var desktop=desktop;

        var closeButton = game.make.sprite(0, 0, 'close');
        closeButton.alignIn(this,Phaser.TOP_RIGHT);
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(kill(), this);
        this.addChild(closeButton)

        var maxButton = game.make.sprite(0, 0, 'max').alignTo(closeButton, Phaser.LEFT_CENTER, 8);
        maxButton.inputEnabled = true;
        maxButton.input.priorityID = 1;
        maxButton.input.useHandCursor = true;
        maxButton.events.onInputDown.add(max(s));

        var minButton = game.make.sprite(0, 0, 'close').alignTo(closeButton, Phaser.LEFT_CENTER, 8);
        minButton.inputEnabled = true;
        minButton.input.priorityID = 1;
        minButton.input.useHandCursor = true;
        minButton.events.onInputDown.add(min, this);

        this.anchor.setTo(0, 0);
        function kill(){
            maxButton.destroy();
            minButton.destroy();
            closeButton.destroy();
            desktop.endApp(this);
        }
        function max(s){
            console.log('clicked',s.name,s.renderOrderID);
            this.alpha=1;
            this.scale.setTo((desktop.MaxX-desktop.MinX)/(this.MaxX-this.MinX),(desktop.MaxY-desktop.MinY)/(this.MaxY-this.MinY));
        }
        function min(){
            this.alpha=0;
        }
        function awake(){
            this.alpha=1;
            console.log('clicked',s.name,s.renderOrderID);
        }
        function add(thing, arragement)
        {
            this.addChild(thing);
            thing.alignIn(this,arragement);
        }
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
    var moos=0;
    function create() {
        desktop= new desktop(game,'desktop1',0,0, game.world.width, game.world.height);
        desktop.anchor.setTo(.5,.5);''
        cow=game.add.sptite(700,350,'cow');
        cow.alignIn(desktop, Phaser.BOTTOM_RIGHT, 40,40);
        cow.inputEnabled=true;
        cow.input.onDown(cowPress);            
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        fskey = game.input.keyboard.addKey(Phaser.Keyboard.F11);
        fskey.onDown.add(gofull, this);        
        fx = game.add.audio('sfx');
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

    }
    function cowPress(){
        moos++;
        if (moos<3){

        }
    }
    function update() {
        

    }
};
