/*
Team Member: Neo Zhang, Sam Luyen, Jan Ning
Title: 
Completion Data: 
Creative Tilt:

*/
let gameOption = {
    playerGravity: 900,
    jumpForce: 325,
    jumps: 2, 
    score: 0, 
    finalScore: 0, 
    scoreSecs: 0,
    scoreMins: 0, 
    highSecs: 0, 
    highMins: 0, 
    speed: 140

}

var config = {
    type: Phaser.AUTO, 
    width: 640,
    height: 640,
    parent: 'phaser-game',
    scene: [ Menu, room1, room2, room3, room4, room5, room6, room7,room8, room9],
    physics: {
        default: 'arcade',
        arcade: {debug:1} // change false to make the pink lines go away
    }
};
let game = new Phaser.Game(config);

// set UI size
let baseUI = 32;


// Keybindings
let keySPACE, keyLEFT, keyRIGHT, keyF, keyUP, keyESC; 
