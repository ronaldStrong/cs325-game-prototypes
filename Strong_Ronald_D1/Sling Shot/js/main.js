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
    var catchFlag = false;
    var launchVelocity = 0;
    var scoredisplay;
    function create() {
        game.add.image(0,0,'sky');
        surface=game.add.sprite(0,this.game.world.height-150,'ground');
        player = game.add.sprite(((this.game.world.width)*Math.random())+50, (this.game.world.height-200)*Math.random()+50, 'ball' );
        player.anchor.setTo( 0.5, 0.5 );
        backBoard=game.add.sprite(this.game.world.width-71,(Math.random()*(this.game.world.height-400)+300),'bBoard');
        backBoard.anchor.setTo(0,1);
        rightR=game.add.sprite(backBoard.world.x-49,backBoard.world.y,'rightRim');
        middleR=game.add.sprite(rightR.world.x-200,rightR.world.y,'middleRim');
        leftRim=game.add.sprite(middleR.world.x,middleR.world.y,'leftRim');
        // Turn on the arcade physics engine for this sprite.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;
        game.physics.enable(surface,Phaser.Physics.ARCADE);
    
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.anchor.setTo(0.5, 0.5);
        player.body.collideWorldBounds = true;
        player.body.bounce.setTo(0.9, 0.9);
    
        // Enable input.
        player.inputEnabled = true;
        player.input.start(0, true);
        player.events.onInputDown.add(set);
        player.events.onInputUp.add(launch);

}

function set(player, pointer) {

    player.body.moves = false;
    player.body.velocity.setTo(0, 0);
    player.body.allowGravity = false;
    catchFlag = true;

}

function launch() {

    catchFlag = false;
    
    player.body.moves = true;
    arrow.alpha = 0;
    analog.alpha = 0;
    Xvector = (game.input.activePointer.worldX - player.x) * 3;
    Yvector = (game.input.activePointer.worldY - player.y) * 3;
    player.body.allowGravity = true;  
    player.body.velocity.setTo(Xvector, Yvector);

}

function update() {

    arrow.rotation = game.physics.arcade.angleBetween(arrow, player);
    
    if (catchFlag == true)
    {
        //  Track the player sprite to the mouse  
        player.x = game.input.activePointer.worldX;   
        player.y = game.input.activePointer.worldY;
        
        arrow.alpha = 1;    
        analog.alpha = 0.5;
        analog.rotation = arrow.rotation - 3.14 / 2;
        analog.height = game.physics.arcade.distanceToPointer(arrow);  
        launchVelocity = analog.height;
    }   

}

function render() {

    game.debug.text("Drag the ball and release to launch", 32, 32);

    game.debug.bodyInfo(player, 32, 64);

    // game.debug.spriteInfo(ball, 32, 64);
    // game.debug.text("Launch Velocity: " + parseInt(launchVelocity), 32, 250);

    }
function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        game.physics.arcade.overlap(player, middleR, goal(), null, this);
        //game.physics.p2.hitTest(player.body, middleR.body);
        //if(player.world.x < )

    }
    function goal(){
        backBoard.kill();
        rightR.kill();
        leftRim.kill();
        middleR.kill();
        score++;
        scoredisplay.text = score;
        this.backBoard=game.add.sprite(this.game.world.width-71,(Math.random()*(back.height-350)+300),'bBoard');
        this.rightR=game.add.sprite(backBoard.width-49,backBoard.height-34,'rightRim');
        this.middleR=game.add.sprite(rightR.width-200,rightR.height,'middleRim');
        this.leftRim=game.add.sprite(middleR.x,middleR.y,'leftRim');
    }
};
