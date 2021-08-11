var flip = false, flop = false, pause = true, clickF = 0;
var dir = 1;


class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        /*
        All the loaded asset are shared to all scene
        as long this the first scene loaded in the game
        */
        pause = true;
        this.load.image('sign', './assets/WoodenSign.png');
        this.load.image('tent', './assets/Tent.png');
        this.load.image('control', './assets/ControlWindowDebug.png');
        this.load.image('control1', './assets/creditpicture.png');
        this.load.image('background', './assets/Background.png');
        this.load.image('tower', './assets/Tower.png');
        this.load.image('gate', './assets/Gate.png');
        this.load.image('title','./assets/title3.png');
        this.load.image('fastesttime','./assets/Fastest5.png');
        this.load.image('tenttext','./assets/credits3.png');

        this.load.spritesheet('tiles', './assets/GrassGround-Sheet.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 11});
        this.load.spritesheet('towerwall', './assets/InsideWall.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 17});
        this.load.spritesheet('p1', './assets/Player01.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 19 });
        this.load.spritesheet('pressF', './assets/PressF.png', 
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1 });
        this.load.spritesheet('pressSpace', './assets/PressSpace.png', 
            {frameWidth: 160, frameHeight: 32, startFrame: 0, endFrame: 1 });
        this.load.spritesheet('extraJump', './assets/Springs-Sheet.png',
            {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 9 });
        
        this.load.audio('jump', './assets/jump.wav'); 
        this.load.audio('music10','./assets/titlemusic3.mp3');
        this.load.image('door', './assets/Door.png');
        this.load.audio('select','./assets/openF.wav');
        this.load.audio('nextlvlsfx','./assets/nextlvl.wav');
        this.load.audio('Lose','./assets/LoseSfx1.wav');

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    create() {

        //
        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0,0);
        this.tower = this.add.sprite(0, 0, 'tower').setOrigin(0,0);
        this.Title = this.add.sprite(86,0, 'title').setOrigin(0,0);;
        console.log("new");
  
        // Load Audio 
        this.jumpsfx = this.sound.add('jump', {volume: .15}); 
        this.selectsfx = this.sound.add('select', {volume: .25}); 
        this.backgroundMusic = this.sound.add("music10", {volume: .34, loop: true}); 
        this.backgroundMusic.play(); 
        // Variable to store the arrow key pressed

        // Shows the player's High Score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: '#000000',
            align: 'right',
            padding: {
              top: 12,
              bottom: 9,
            },
            fixedWidth: 0
        }

        // If Final Score is 0 and Score isn't, change
        //this.add.text(game.config.width / 2, game.config.height / 3, 'Fastest Time Complete', menuConfig).setOrigin(0.5);
        
        
        
        this.fastest = this.add.sprite(82,220, 'fastesttime').setOrigin(0,0);;

        if (gameOption.highSecs < 10) {
            this.add.text(game.config.width / 2, game.config.height / 2, "0" + gameOption.highSecs, menuConfig).setOrigin(0.5);
        }
        else {
            this.add.text(game.config.width / 2, game.config.height / 2, gameOption.highSecs, menuConfig).setOrigin(0.5);
        }
        this.add.text(game.config.width / 2 - 30, game.config.height / 2, ":", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2 - 47, game.config.height / 2, gameOption.highMins, menuConfig).setOrigin(0.5);
        

        //-----------------
        // Create the level
        //-----------------
        this.ground = this.add.group();
        this.level = [
            '                    ', // 0
            '                    ', // 1
            '                    ', // 2
            '                    ', // 3
            '                    ', // 4
            '                    ', // 5
            '                    ', // 6
            '                    ', // 7
            '                    ', // 8
            '                    ', // 9
            '                    ', // 10
            '                    ', // 11
            '                    ', // 12
            '                    ', // 13
            '                    ', // 14
            '                    ', // 15
            '                    ', // 16
            '                    ', // 17
            '                    ', // 18
            'gggggggggggggggggggg'  // 19
        ];
        // Create the level by going though the array
        for (var i = 0; i < this.level.length; i++) {
            for (var j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] == 'g') {
                    this.floor = this.physics.add.sprite(32*j, 32*i, 'tiles', 0).setOrigin(0,0);
                    this.ground.add(this.floor);
                    this.floor.body.immovable = true;
                }
            }
        }

        this.sign = this.physics.add.sprite(baseUI*5, baseUI*18, 'sign');
        this.tent = this.physics.add.sprite(baseUI*19, baseUI*19, 'tent').setOrigin(1,1);
        this.tent.body.setSize(70, 80);
        this.door = this.physics.add.sprite(baseUI*10, baseUI*16, 'gate');
        this.door.body.setSize(130, 160);
        this.control = this.add.sprite(baseUI*10, baseUI*10, 'control').setOrigin(0.5, 0.5);
        this.control.alpha = 0;
        this.control1 = this.add.sprite(baseUI*10, baseUI*10, 'control1').setOrigin(0.5, 0.5);
        this.control1.alpha = 0;
        //tent credits 
        this.tentTxt = this.add.sprite(313,487, 'tenttext').setOrigin(0,0);

        // Animation config
        // Left Idle
        this.anims.create({
            key: 'leftIdle',
            frames: this.anims.generateFrameNumbers('p1', { start: 0, end: 3, first: 0 }),
            frameRate: 10
        })
        // Right Idle
        this.anims.create({
            key: 'rightIdle',
            frames: this.anims.generateFrameNumbers('p1', { start: 4, end: 7, first: 4 }),
            frameRate: 10
        })
        // Left Walk
        this.anims.create({
            key: 'leftWalk',
            frames: this.anims.generateFrameNumbers('p1', { start: 8, end: 11, first: 8 }),
            frameRate: 10
        })
        // Right Idle
        this.anims.create({
            key: 'rightWalk',
            frames: this.anims.generateFrameNumbers('p1', { start: 12, end: 15, first: 12 }),
            frameRate: 10
        })
        this.anims.create({
            key: 'interact',
            frames: this.anims.generateFrameNumbers('pressF', { start: 0, end: 1, first: 0 }),
            frameRate: 1
        })
        this.anims.create({
            key: 'interact1',
            frames: this.anims.generateFrameNumbers('pressF', { start: 0, end: 1, first: 0 }),
            frameRate: 1
        })
        this.anims.create({
            key: 'space',
            frames: this.anims.generateFrameNumbers('pressSpace', { start: 0, end: 1, first: 0 }),
            frameRate: 1
        })
        this.anims.create({
            key: 'jumpPU',
            frames: this.anims.generateFrameNumbers('extraJump', { start: 0, end: 9, first: 0 }),
            frameRate: 20
        })

        // Number of consecutive jumps made
        this.playerJumps = 0;

        // Create the player in the middle of the Menu Screen.
        this.player = this.physics.add.sprite(baseUI*2, baseUI*18, 'p1', 0).setOrigin(0,0);

        // Add gravity to make it fall
        this.player.setGravityY(gameOption.playerGravity);

        // set collision between the player and platform
        this.physics.add.collider(this.player, this.ground);
        

        // The two button
        this.press1 = this.add.sprite(baseUI*4.5, baseUI*16.5, 'pressF', 0).setOrigin(0,0);
        this.press3 = this.add.sprite(baseUI*16.5, baseUI*16.5, 'pressF', 0).setOrigin(0,0);
        this.press2 = this.add.sprite(baseUI*7.5, baseUI*15.5, 'pressSpace', 0).setOrigin(0,0);


        
    }
        
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE))) {
            this.game.sound.stopAll(); 
            this.scene.start('room1');
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO))) {
            this.game.sound.stopAll(); 
            this.scene.start('room6');
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE))) {
            this.game.sound.stopAll(); 
            this.scene.start('room4');
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR))) {
            this.game.sound.stopAll(); 
            this.scene.start('room3');
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE))) {
            this.game.sound.stopAll(); 
            this.scene.start('room5');
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX))) {
            this.game.sound.stopAll(); 
            this.scene.start('room7');
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN))) {
            this.game.sound.stopAll(); 
            this.scene.start('room8');
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT))) {
            this.game.sound.stopAll(); 
            this.scene.start('room2');
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE))) {
            this.game.sound.stopAll(); 
            this.scene.start('room9');
        }

        this.press1.alpha = 0;
        this.press2.alpha = 0;
        this.press3.alpha = 0;
        this.sky.tilePositionX += 2;
        
        this.physics.overlap(this.player, this.sign, function() { this.signtrigger() }, null, this);
        this.physics.overlap(this.player, this.tent, function() { this.tenttrigger() }, null, this);
        this.physics.overlap(this.player, this.door, function() { this.doortrigger() }, null, this);
        if (pause) {
            // Left and Right Movement
            if (keyLEFT.isDown && this.player.x > 0){
                this.player.anims.play('leftWalk', true);
                dir = 1;
                this.player.setVelocityX(-1*gameOption.speed);
            }
            else if (keyRIGHT.isDown && this.player.x < game.config.width - this.player.width){
                this.player.anims.play('rightWalk', true);
                dir = -1;
                this.player.setVelocityX(gameOption.speed);
            }
            else {
                if (dir == 1)
                    this.player.anims.play('leftIdle', true);
                if (dir == -1)
                    this.player.anims.play('rightIdle', true);
                this.player.setVelocityX(0);
            }  
            if (keyUP.isDown) {
                if (!flip) {
                    this.jump();
                    flip = true;
                }
            }
            if (keyUP.isUp){
                flip = false;
            }
        }
    }

    signtrigger() {
        this.press1.anims.play('interact', true);
        this.press1.alpha = 1;
        if (keyF.isDown) {
            if (!flop) {
                if (clickF == 0) {
                    this.selectsfx.play();
                    this.player.setVelocityX(0);
                    pause = false;
                    this.control.alpha = true;
                    clickF = 1;
                }
                else if (clickF == 1) {
                    pause = true;
                    this.control.alpha = false;
                    clickF = 0;
                }
                flop = true;
            }
        }
        if (keyF.isUp) {
            flop = false;
        }
    }

    tenttrigger() {
        this.press3.anims.play('interact1', true);
        this.press3.alpha = 1;
        if (keyF.isDown) {
            if (!flop) {
                if (clickF == 0) {
                    this.selectsfx.play();
                    this.player.setVelocityX(0);
                    pause = false;
                    this.control1.alpha = true;
                    clickF = 1;
                }
                else if (clickF == 1) {
                    pause = true;
                    this.control1.alpha = false;
                    clickF = 0;
                }
                flop = true;
            }
        }
        if (keyF.isUp) {
            flop = false;
        }
    }

   

    jump() {
        // Make the player jump if only they are touching the ground

        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOption.jumps) || (this.doortrigger1=false)){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOption.jumpForce * -1);
            this.jumpsfx.play(); 
            this.playerJumps += 1;
        }
    }

    doortrigger() {
        this.press2.anims.play('space', true);
        this.press2.alpha = 1;
        if (keySPACE.isDown) {
            this.game.sound.stopAll(); 
            this.scene.stop();
            console.log("Entering Door");
            pause = false;
            this.scene.start('room1');
        }
    }
}