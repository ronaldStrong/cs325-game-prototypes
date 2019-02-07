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
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 500;
        game.physics.p2.restitution = 0.8;
        game.physics.p2.enable(surface, true);
        // Make it bounce off of the world bounds.
        game.physics.p2.enable(player, true);
        player.body.setCircle(20);
        player.body.collideWorldBounds = true;
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( game.world.centerX, 15, "Score", style );
        //var scoredisplay= game.add.text(game.world.centerX,30,score);
        //text.anchor.setTo( 0.5, 0.0 );
        //scoredisplay.anchor.setTo(0.5,0.0);
        game.input.onDown.add(click, this);
        game.input.onUp.add(release, this);
        //game.input.addMoveCallback(game.input.pointer.move, this);
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.game.physics.arcade.collide(this.player, this.surface);
        //this.game.physics.arcade.collide(this.player,this.backBoard);
        //game.physics.arcade.overlap(player, middleR, goal(), null, this);
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
    
    function click(pointer) {

        var bodies = game.physics.p2.hitTest(game.input.pointer, [ player.body ]);
        
        if (bodies.length)
        {
            //  Attach to the first body the mouse hit
            mouseSpring = game.physics.p2.createSpring(pointer, bodies[0], 0, 30, 1);
            line.setTo(player.x, player.y, pointer.x, pointer.y);
            drawLine = true;
        }
    
    }
    
    function release() {
    
        game.physics.p2.removeSpring(mouseSpring);
    

    
    }
    

};
