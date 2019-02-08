"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: 
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 1078, 588, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image('sky','assets/sky.png');
        game.load.image('ground','assets/ground.png');
        game.load.image('ball','assets/ball.png');
        game.load.image('leftRim','assets/leftrim.png');
        game.load.image('middleRim','assets/middlerim.png');
        game.load.image('rightRim','assets/rightrim.png');
        game.load.image('bBoard','assets/backboard.png');
    }
    
    var player;
    var surface;
    var back;
    var score=0;
    var mouseSpring;
    var line;
    var drawline;
    var backBoard;
    var middleR;
    var leftRim;
    var rightR;
    var pointer;
    var scoredisplay;
    function create() {
        game.add.image(0,0,'sky');
        
        surface=game.add.sprite(0,558,'ground');
        
        player = game.add.sprite(((this.game.world.width)*Math.random())+50, (this.game.world.height-200)*Math.random()+50, 'ball' );
        player.anchor.setTo( 0.5, 0.5 );
        
        backBoard=game.add.sprite(0,game.world.centerY/3,'bBoard');
        backBoard.anchor.setTo(0,0);
        
        rightR=game.add.sprite(100,100,'rightRim');
        
        middleR=game.add.sprite(rightR.world.x-200,rightR.world.y,'middleRim');
        
        leftRim=game.add.sprite(middleR.world.x,middleR.world.y,'leftRim');
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 500;
        
        game.physics.enable(surface,Phaser.Physics.ARCADE);
        surface.body.immovable = true;
        surface.body.collideWorldBounds = true;

        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.body.bounce.setTo(.85, .75);
        
        game.physics.enable(backBoard,Phaser.Physics.ARCADE);
        backBoard.body.immovable = true;
        backBoard.body.collideWorldBounds = true;

        game.physics.enable(leftRim,Phaser.Physics.ARCADE);
        leftRim.body.immovable = true;
        leftRim.body.collideWorldBounds = true;

        game.physics.enable(rightR,Phaser.Physics.ARCADE);
        rightR.body.immovable = true;
        rightR.body.collideWorldBounds = true;
        


        

    }
    
    function update() {
        game.physics.arcade.collide(player,leftRim);
        game.physics.arcade.collide(player,rightR);
        game.physics.arcade.collide(player,backBoard);
        game.physics.arcade.collide(player,surface);
        game.physics.arcade.overlap(player, middleR, goal(), null, this);
        

    }
    function goal(){
        backBoard.kill();
        rightR.kill();
        leftRim.kill();
        middleR.kill();
        score++;
        //scoredisplay.text = score;
        backBoard=game.add.sprite(game.world.width-71,(Math.random()*(game.world.height-350)+300),'bBoard');
        rightR=game.add.sprite(backBoard.width-49,backBoard.height-34,'rightRim');
        middleR=game.add.sprite(rightR.width-200,rightR.height,'middleRim');
        leftRim=game.add.sprite(middleR.x,middleR.y,'leftRim');
        }
    
    function click(pointer) {

        if(game.physics.arcade.overlap(pointer,player.body)){
            player.world.x=pointer.worldX;
            player.world.y=pointer.worldY;

        }
    
    }
    
    function release() {
    
        //game.physics.arcade.removeSpring(mouseSpring);
    

    
    }
    

};
