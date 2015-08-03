#!/usr/bin/env node

require('./node_modules/jsi-gamelib').map(require(process.argv[2]));

var game = require("./" + process.argv[2]);

var readline = require('readline');

var rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

var currentRoom = "A";
var currentRoomIndex = 1;


var displayMessage = function() {
 for (var i = 0; i < 10; i++)
 {
   if (game.rooms[i].name === currentRoom)
   {
   console.log(game.rooms[i].message);
   }
 }
};


var getCurrentRoomIndex = function() {
 for (var i = 0; i < 11; i++)
 {
   if (game.rooms[i].name === currentRoom)
   {
   currentRoomIndex = i;
   }
 }
 return currentRoomIndex;
};



var playGame = function () {
 currentRoomIndex = getCurrentRoomIndex();
 if (game.rooms[currentRoomIndex].treasure)
 {
   console.log("You Found the Treasure!");
   rl.close();
 }

 else
 {
   displayMessage();
   rl.question("Which way do you want to go? ", function(choice){

     if (choice === "north")
     {
       currentRoom = game.rooms[currentRoomIndex].north;
       if (game.rooms[currentRoomIndex].north === null){
         console.log('Bad choice, there is no door here!');
       }
     }

     else if (choice === "east")
     {
       currentRoom = game.rooms[currentRoomIndex].east;
       if (game.rooms[currentRoomIndex].east === null){
         console.log('Bad choice, there is no door here!');
       }
     }

     else if (choice === "south")
     {
       currentRoom = game.rooms[currentRoomIndex].south;
       if (game.rooms[currentRoomIndex].south === null){
         console.log('Bad choice, there is no door here!');
       }
     }

     else if (choice === "west")
     {
       currentRoom = game.rooms[currentRoomIndex].west;
       if (game.rooms[currentRoomIndex].west === null){
         console.log('Bad choice, there is no door here!');
       }
     }

     else{
       console.log('Please Enter An approppo command');
    }

     playGame();

   }); //end of callback function
 }
};
