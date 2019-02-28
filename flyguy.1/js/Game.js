"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var player;
    var jumps;
    var MAX_SPEED;
    var ACCELERATION;
    var DRAG;
    var GRAVITY;
    var JUMP_SPEED;
    var jumping;
    var ground;
    var towers;
    var tower;
    var music;
    var playerinput;
    var framecounter;

    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
       
        game.state.start('MainMenu');

    }
    
    return {
        leftInputIsActive: function() {
            var isActive = false;
        
            isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
            isActive |= (this.game.input.activePointer.isDown &&
                this.game.input.activePointer.x < this.game.width/4);
        
            return isActive;
        },
        
        // This function should return true when the player activates the "go right" control
        // In this case, either holding the right arrow or tapping or clicking on the right
        // side of the screen.
        rightInputIsActive: function() {
            var isActive = false;
        
            isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
            isActive |= (this.game.input.activePointer.isDown &&
                this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);
        
            return isActive;
        },
        
        // This function should return true when the player activates the "jump" control
        // In this case, either holding the up arrow or tapping or clicking on the center
        // part of the screen.
        upInputIsActive:function(duration) {
            var isActive = false;
        
            isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
            isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
                this.game.input.activePointer.x > this.game.width/4 &&
                this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);
        
            return isActive;
        },
        
        // This function returns true when the player releases the "jump" contr
        upInputReleased : function() {
            var released = false;
        
            released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
            released |= this.game.input.activePointer.justReleased();
        
            return released;
        },
        hitSprite: function( spriteA, spriteB){
            if(spriteA==player){
                if(ground.children.indexOf(spriteB) > -1){
                    this.endgame();
                }
                else{
                    for(var i =0; i<towers.total; i++){                    
                        if(towers.children[i].children.indexOf(spriteB) > -1){
                            for(var j=0;j<towers.children[i].total;j++){
                                towers.children[i].children[j].body.immovable=false;
                                towers.children[i].children[j].body.allowGravity= true;
                                towers.children[i].children[j].body.acceleration.x=player.body.acceleration.x/8;
                                player.body.acceleration.x= -7/8* player.body.acceleration.x;
                                }
                            }
                        }
               
                    }
                }
            if (spriteB==player){
                if(ground.children.indexOf(spriteA) > -1){
                    this.endgame();
                }
                else{
                    for(var i =0; i<towers.total; i++){                    
                        if(towers.children[i].children.indexOf(spriteA) > -1){
                            for(var j=0;j<towers.children[i].total;j++){
                                towers.children[i].children[j].body.immovable=false;
                                towers.children[i].children[j].body.allowGravity= true;
                                towers.children[i].children[j].body.acceleration.x=player.body.acceleration.x/8;
                                player.body.acceleration.x= -7/8* player.body.acceleration.x;
                                }
                            }
                        }
               
                    }
            }
        },
        endgame: function(){
            playerinput=false;
            for(var i =0; i<ground.total; i++){
                ground.children[i].enable(false);
            }
            music.stop();
            player.body.collideWorldBounds=false;
            var deathp = new Text(game, game.centerX, game.centerY, "YOU DIED");
            var playbutton = game.add.button( game.centerX-300,game.centerY+100, 'playAgain', game.state.start('Game'), null);
            var mainbutton = game.add.button( game.centerX+300,game.centerY+100, 'mainMenuButton', quitGame, null,);
        },
        blockUpdate: function(){
            if (frames==0){
                const setting =Math.floor((Math.random() * 3) + 1);
                if (setting==1)
                for(var y  = 0; y > game.height; y += 32) {
                    var rand =Math.floor((Math.random() * 2) + 1);
                    tower= game.add.group();
                    if(rand==2){
                        game.physics.enable(block, Phaser.Physics.ARCADE);
                        block.body.immovable = true;
                        block.body.allowGravity = false;
                        tower.add(block);
                    }
                    
                }
                towers.add(tower);
            }
            for(var i =0; i<towers.total; i++){
                towers.children
            }
        },
        
        create: function () {
            player=game.add.sprite(game.world.centerX, game.world.centerY,'player')
            player.anchor.setTo(.75,.75);
            game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
            game.stage.backgroundColor = 0x4488cc;
            music=game.add.audio('playmusic');
            music.play();
            music.loop = true;
        // Define movement constants
        MAX_SPEED = 500; // pixels/second
        ACCELERATION = 1500; // pixels/second/second
        DRAG = 600; // pixels/second
        GRAVITY = 2600; // pixels/second/second
        JUMP_SPEED = -1000; // pixels/second (negative y is up)


        // Enable physics on the player
        game.physics.enable(player, Phaser.Physics.ARCADE);

        // Make player collide with world boundaries so he doesn't leave the stage
        player.body.collideWorldBounds = true;

        // Set player minimum and maximum movement speed
        player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 10); // x, y

        // Add drag to the player that slows them down when they are not accelerating
        player.body.drag.setTo(DRAG, 0); // x, y

        // Since we're jumping we need gravity
        game.physics.arcade.gravity.y = GRAVITY;
        
        // Flag to track if the jump button is pressed
        jumping = true;
        playerinput=true;
        // Create some ground for the player to walk on
        ground = game.add.group();
        for(var x = 0; x < game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
            var lavaBlock = game.add.sprite(x, game.height - 32, 'Lava');
            game.physics.enable(lavaBlock, Phaser.Physics.ARCADE);
            lavaBlock.body.immovable = true;
            lavaBlock.body.allowGravity = false;
            ground.add(lavaBlock);
        }

        towers=game.add.group();
        for(var x = game.width/3; x < game.width*(2/3); x += 32) {
            tower= game.add.group();
            for(var y  = game.height-32; y > game.height*(2/3); y -= 32) {
                var block = game.add.sprite(x,y,'tower');
                game.physics.enable(block, Phaser.Physics.ARCADE);
                block.body.immovable = true;
                block.body.allowGravity = false;
                tower.add(block);
            }
            towers.add(tower);
        }
        // Capture certain keys to prevent their default actions in the browser.
        // This is only necessary because this is an HTML5 game. Games on other
        // platforms may not need code like 
        game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
        ]);
        player.body.onCollide = new Phaser.Signal();
        player.body.onCollide.add(this.hitSprite, this);
        framecounter=0;
        },
    
        update: function () {

            // Collide the player with the ground
            if (playerinput==true){
                game.physics.arcade.collide(player, ground);
                for(var i =0; i<towers.total; i++){  
                    game.physics.arcade.collide(player, towers.children[i]);
            }
        }
            if (this.leftInputIsActive()&&playerinput==true) {
            // If the LEFT key is down, set the player velocity to move left
            player.body.acceleration.x = -ACCELERATION;
            player.scale.setTo(-1,1);
            } else if (this.rightInputIsActive()&&playerinput==true) {
            // If the RIGHT key is down, set the player velocity to move right
            player.body.acceleration.x = ACCELERATION;
            player.scale.setTo(1,1);
            } else {
            player.body.acceleration.x = 0;
            }

    // Set a variable that is true when the player is touching the ground
    var onTheGround = player.body.touching.down;

    // If the player is touching the ground, let him have 2 jumps
    if (onTheGround) {
        jumps = 1;
        jumping = false;
    }

    // Jump!
    if (jumps > 0 && this.upInputIsActive(5) && playerinput==true) {
        player.body.velocity.y = JUMP_SPEED;
        jumping = true;
    }

    // Reduce the number of available jumps if the jump input is released
    if (jumping && this.upInputReleased()&& playerinput==true) {
        jumps--;
        jumping = false;
    }
    if(jumps<=0 && this.upInputIsActive(2)&& playerinput==true){
        player.body.velocity.y=JUMP_SPEED/3;
        player.body.velocity.x= player.body.velocity.x/2;
    }
},
 

            
    }
    
};
