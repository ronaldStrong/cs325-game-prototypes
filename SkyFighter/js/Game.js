"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    let leftkey;
    let rightkey;
    let upkey;
    let downkey;
    let enterkey;

    var pad;
    let buttonA;
    let buttonB;
    let buttonX;
    let buttonY;
    let buttonDPadLeft;
    let buttonDPadRight;
    let buttonDPadUp;
    let buttonDPadDown;

    let axis0;
    let axis1;

    let player;

    let MAX_SPEED;
    let ACCELERATION;
    let PROJECTILE_GRAVITY;
    let DASH_SPEED;
    var movetext;
    class Player{
        ship;
        sword;
        wing;
        idletween;
        directioninput=new Array(5);
        currentaxis=new Array(2);
        constructor (){
            this.ship=game.add.sprite(100,game.world.centerY,'playership');
            game.physics.enable(this.ship);
            this.ship.anchor.setTo(.5,.5);
            this.ship.body.collideWorldBounds=true;
            this.ship.body.maxVelocity.setTo(MAX_SPEED,MAX_SPEED);

            this.wing=game.add.sprite(this.ship.centerX,this.ship.centerY,'wing');
            game.physics.enable(this.wing);
            this.wing.body.collideWorldBounds=true;
             

            this.sword=game.add.sprite(this.ship.centerX+10,this.ship.centerY,'shipnose');
            game.physics.enable(this.sword);
            this.sword.body.collideWorldBounds=true;
            
            this.ship.addChild(this.wing);
            this.ship.addChild(this.sword);

            this.idletween=game.add.tween(this.ship).to({y:[this.ship.centerY,this.ship.centerY+10,this.ship.centerY,this.ship.centerY-10,this.ship.centerY]},4000, "Sine.easeInOut", true, -1, false);
            this.idletween.interpolation(Phaser.Math.bezierInterpolation);
            this.directioninput[0]=0;
            this.directioninput[1]=0;
            this.directioninput[2]=0;
            this.directioninput[3]=0;
            this.directioninput[4]=0;
            this.currentaxis[0]=0;
            this.currentaxis[1]=0;
        }
        get sprite(){
            return this.ship;
        }
        inputButtonStart(){
            this.idletween.pause();
            if (((this.directioninput[4]%10===2)&&(this.directioninput[3]%10===3)&&(this.directioninput[2]==3)&&(this.directioninput[1]===3)(this.directioninput[0]===6))||
            ((this.directioninput[3]%10===2)&&(this.directioninput[2]%10===3)&&(this.directioninput[1]%10===3)(this.directioninput[0]%10===6))||
            ((this.directioninput[2]%10===2)&&(this.directioninput[1]%10===3)(this.directioninput[0]%10===6))){
                this.move1();
            }
            else{
                this.dash()
            }
        }
        inputButtonStop(){
            this.idletween.resume();
            this.directioninput[4]=0;
            this.directioninput[3]=0;
            this.directioninput[2]=0;
            this.directioninput[1]=0;
            this.directioninput[0]=0;
        }
        inputDirection(direction){
            this.directioninput[4]=this.directioninput[3];
            this.directioninput[3]=this.directioninput[2];
            this.directioninput[2]=this.directioninput[1];
            this.directioninput[1]=this.directioninput[0];
            this.directioninput[0]=direction;

        }
        axisDirection(pad,axis,value){
            currentaxis[axis]=value;
            if(currentaxis[0]===0){
                if (currentaxis[1]<0){
                    if (this.directioninput[0]!==8){//Up
                        this.inputDirection(8);
                    }
                }
                else if (currentaxis[1]>0){
                    if (this.directioninput[0]!==2){//Down
                        this.inputDirection(2);
                    }
                }
                else{
                    if (this.directioninput[0]!==5){
                        this.inputDirection(5);
                    }
                }

            }
            else if(currentaxis[1]===0){
                if (currentaxis[0]<0){//Left
                    if (this.directioninput[0]!==4){
                        this.inputDirection(4);
                    }
                }
                else if(currentaxis[0]>0){//Right
                    if (this.directioninput[0]!==6){
                        this.inputDirection(6);
                    }
                else{
                    if (this.directioninput[0]!==5){
                        this.inputDirection(5);
                        }
                    }
                }
            }
            else if((currentaxis[0]/currentaxis[1]>.75)&&(currentaxis[0]/currentaxis[1]<1.25)){
                if (currentaxis[0]>0&&this.directioninput[0]!==3){//DOWN RIGHT
                    this.inputDirection(3);
                }
                else if(this.directioninput[0]!==7){//UP LEFT
                    this.inputDirection(7);
                }
            }
            else if((currentaxis[0]/currentaxis[1]<-.75)&&(currentaxis[0]/currentaxis[1]>-1.25)){
                if (currentaxis[0]>0&&this.directioninput[0]!==1){//DOWN Left
                    this.inputDirection(1);
                }
                else if(this.directioninput[0]!==9){//UP Right
                    this.inputDirection(9);
                }
            }
            this.movement(currentaxis[1],currentaxis[0]*-1.0);

        }
        movement(horizontal, vertical){
            if (horizontal<0){
                this.ship.scale.setTo(-1,1);
            }
            else if(horizontal>0){
                this.ship.scale.setTo(1,1);
            }
            this.ship.body.acceleration.x=horizontal*ACCELERATION;
            this.ship.body.acceleration.y=vertical*ACCELERATION*-1.0;
        }
        move1(){
            game.add.tween(movetext).to( { alpha: [1,0] }, 2000, "Linear", true);
        }
        dash(){
            game.add.tween(this.ship.body.velocity). to({x:[MAX_SPEED,0]},2000, "Linear", true);
        }
        update(){
            this.wing.bringToTop();
            this.sword.bringToTop();
        }
    }
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    function addButtons() {

        //  We can't do this until we know that the gamepad has been connected and is started
    
        buttonA = pad.getButton(Phaser.Gamepad.XBOX360_A);
        buttonB = pad.getButton(Phaser.Gamepad.XBOX360_B);
        buttonX = pad.getButton(Phaser.Gamepad.XBOX360_X);
        buttonY = pad.getButton(Phaser.Gamepad.XBOX360_Y);
        buttonA.onDown.add(onDown, this);
        buttonB.onDown.add(onDown, this);
        buttonX.onDown.add(onDown, this);
        buttonY.onDown.add(onDown, this);

        buttonA.onUp.add(onUp, this);
        buttonB.onUp.add(onUp, this);
        buttonX.onUp.add(onUp, this);
        buttonY.onUp.add(onUp, this);
        //  These won't work in Firefox, sorry! It uses totally different button mappings

        buttonDPadLeft = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
        buttonDPadRight = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
        buttonDPadUp = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP);
        buttonDPadDown = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);

        buttonDPadLeft.onDown.add(onDown, this);
        buttonDPadRight.onDown.add(onDown, this);
        buttonDPadUp.onDown.add(onDown, this);
        buttonDPadDown.onDown.add(onDown, this);

        buttonDPadLeft.onUp.add(onUp, this);
        buttonDPadRight.onUp.add(onUp, this);
        buttonDPadUp.onUp.add(onUp, this);
        buttonDPadDown.onUp.add(onUp, this);

        pad.addCallbacks(this,{ onAxis: function(pad, axis, value){
            player.axisDirection(pad,axis,value);
        }})      
    }
    function setKeys(){
        leftkey =   game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightkey =  game.input.keyboard.addKey(gamePhaser.Keyboard.RIGHT);
        upkey   =   game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downkey =   game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        enterkey =  game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

    function onDown(button, value) {
        if (button.buttonCode === Phaser.Gamepad.XBOX360_A){
            player.inputButtonStart();
        }
        else if (button.buttonCode === Phaser.Gamepad.XBOX360_B){
            player.inputButtonStart();
        }
        else if (button.buttonCode === Phaser.Gamepad.XBOX360_X){
            player.inputButtonStart();
        }
        else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y){
            player.inputButtonStart();
        }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_LEFT){
        if(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)){
            player.inputDirection(1);
            player.movement(-1,-1);
        }
        else if(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)){
            player.inputDirection(7);
            player.movement(-1,1);
        }
        else{
            player.inputDirection(4);
            player.movement(-1,0);
        }
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT)
    {
        if(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)){
            player.inputDirection(3);
            player.movement(1,-1);
        }
        else if(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)){
            player.inputDirection(9);
            player.movement(1,1);
        }
        else{
            player.inputDirection(6);
            player.movement(1,0);
        }    
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP)
    {
        if(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)){
            player.inputDirection(9);
            player.movement(1,1);
        }
        else if(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)){
            player.inputDirection(7);
            player.movement(-1,1);
        }
        else{
            player.inputDirection(8);
            player.movement(0,1);
        }
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN)
    {
        if(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)){
            player.inputDirection(3);
            player.movement(1,-1);
        }
        else if(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)){
            player.inputDirection(1);
            player.movement(-1,-1);
        }
        else{
            player.inputDirection(2);
            player.movement(0,-1);
        }
    }
    else{
        player.inputDirection(5);
        player.movement(0,0);
    }
    }

    function onUp(button, value) {

    if (button.buttonCode === Phaser.Gamepad.XBOX360_A)
    {
        
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_B)
    {
        
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_X)
    {
        
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y)
    {
        
    }
    else
    {
        
    }

    }

    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Create a sprite at the center of the screen using the 'logo' image.
            
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            
            
            // Turn on the arcade physics engine for this sprite.
            // Make it bounce off of the world bounds.
            
        
            game.input.keyboard.addKeyCapture([
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.UP,
                Phaser.Keyboard.DOWN,
                Phaser.Keyboard.ENTER
                ]);
            movetext = game.add.text(game.world.centerX, game.world.centerY, "Move 1", { font: "65px Arial", fill: "#ff0044", align: "center" });
            movetext.alpha=0;
            player= new Player();
            setKeys();
            game.input.gamepad.start();
            pad = game.input.gamepad.pad1;
            pad.addCallbacks(this, { onConnect: addButtons });
            MAX_SPEED = 500; // pixels/second
            ACCELERATION = 1500; // pixels/second/second
            PROJECTILE_GRAVITY = 2600; // pixels/second/second
            DASH_SPEED = 1000; // pixels/second (negative y is up)
              
        },
        
        update: function () {
            player.update();
            if(leftkey.isDown){
                if(upkey.isDown){
                    player.inputDirection(7);
                    player.movement(-1,1);
                }
                else if(downkey.isDown){
                    player.inputDirection(1);
                    player.movement(-1,-1);
                }
                else{
                    player.inputDirection(4);
                    player.movement(-1,0);
                }
            }
            else if(rightkey){
                if(upkey.isDown){
                    player.inputDirection(9)
                    player.movement(1,1);
                }
                else if(downkey.isDown){
                    player.inputDirection(3);
                    player.movement(1,-1);
                }
                else{
                    player.inputDirection(6);
                    player.movement(1,0);
                }
            }
            else if (upkey.isDown){
                if(rightkey.isDown){
                    player.inputDirection(9)
                    player.movement(1,1);
                }
                else if(leftkey.isDown){
                    player.inputDirection(7);
                    player.movement(-1,1);
                }
                else{
                    player.inputDirection(8);
                    player.movement(0,1);
                }
            }
            else if (downkey){
                if(rightkey.isDown){
                    player.inputDirection(3)
                    player.movement(1,-1);
                }
                else if(leftkey.isDown){
                    player.inputDirection(1);
                    player.movement(-1,-1);
                }
                else{
                    player.inputDirection(2);
                    player.movement(0,-1);
                }
            }
            else if (enterkey.isDown) {
                player.inputButtonStart();
            }
            
        }
    };
};
