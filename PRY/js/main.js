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
    class desktop{
        constructor(game, image, gameWorldMinX, gameWorldMinY, gameworldMaxX, gameWorldMaxY){
        //  We call the Phaser.Sprite passing in the game reference
        var sprite=game.make.sprite(game, gameWorldMinY, gameWorldMinY, image)
        var MinX=gameWorldMinX;
        var MaxX=gameworldMaxX;
        var MinY=gameWorldMinY;
        var MaxY=gameWorldMaxY;
        var buttonArray=[]
        var game= game;
        sprite.anchor.setTo(0.5, 0.5);
        game.add.existing(sprite);
        var icons= [];
        var iconsIndex=0;
        var apps =[];
        var appsIndex=0;}
        startApp(app) {
            apps[appsIndex]=app;
            buttonArray[appsIndex]=game.make.sprite(0, 0,);
            buttonArray[appsIndex].alignIn(sprite,Phaser.BOTTOM_LEFT);
            if(appsIndex!==0){
                buttonArray[appsIndex].alignTo(--buttonArray[appsIndex], Phaser.RIGHT_CENTER, 5);
            }
            barButton.inputEnabled = true;
            barButton.input.priorityID = 1;
            barButton.input.useHandCursor = true;
            barButton.events.onInputDown.add(app.awake(), game);
            appsIndex++;
        }
        endApp(app){
            let found = false;
            for( let a of apps ) {
                if((a===app)&&(found===false)){
                    buttonArray[apps.indexOf(app)].destroy();
                    a.destroy();
                }
            }
        }
        get sprite(){
            return sprite;
        }
    };
    class app{
        constructor(game, image, gameWorldMinX, gameWorldMinY, gameworldMaxX, gameWorldMaxY, desktop){
        //  We call the Phaser.Sprite passing in the game reference
        //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
        var sprite=game.make.sprite(game,gameWorldMinX,gameWorldMinY,image);
        sprite.inputEnabled = true;
        sprite.input.enableDrag();
        sprite.events.onInputDown.add(function(s){console.log('clicked',s.name,s.renderOrderID)});
        var MinX=gameWorldMinX;
        var MaxX=gameworldMaxX;
        var MinY=gameWorldMinY;
        var MaxY=gameWorldMaxY;
        var desktop=desktop;
        var game= game;
        var closeButton = game.make.sprite(0, 0, 'close');
        closeButton.alignIn(sprite,Phaser.TOP_RIGHT);
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(kill(), this);
        sprite.addChild(closeButton)

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

        sprite.anchor.setTo(0, 0);}
        kill(){
            maxButton.destroy();
            minButton.destroy();
            closeButton.destroy();
            desktop.endApp(sprite);
        }
        max(s){
            console.log('clicked',s.name,s.renderOrderID);
            sprite.alpha=1;
            sprite.scale.setTo((desktop.MaxX-desktop.MinX)/(this.MaxX-this.MinX),(desktop.MaxY-desktop.MinY)/(this.MaxY-this.MinY));
        }
        min(){
            sprite.alpha=0;
        }
        awake(){
            sprite.alpha=1;
            console.log('clicked',s.name,s.renderOrderID);
        }
        add(thing, arragement)
        {
            sprite.addChild(thing);
            thing.alignIn(sprite,arragement);
        }
        
    }
    var game = new Phaser.Game( 960, 644, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image( 'desktop1', 'assets/background.jpg' );
        game.load.image( 'cow', 'assets/cow.png' );

    }
    
    var fskey;
    var deskt;
    var cow;
    var moos=0;
    function create() {
        deskt= new desktop(game,'desktop1',0,0, game.world.width, game.world.height);
        deskt.sprite.anchor.setTo(.5,.5);
        cow=game.add.sptite(700,350,'cow');
        cow.alignIn(deskt.sprite, Phaser.BOTTOM_RIGHT, 40,40);
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
        if (mooos===1){

        }
        else if (moos===2){

        }
        else if (moos===3){
            pryStart();
            
        } 
    }
    function update() {
        

    }
};
