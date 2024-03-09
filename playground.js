const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
   constructor(position, mode, generatorWatts = 110) {
      this.position = position;
      if (!position) {
         throw Error("Position required")
      };
      this.mode = "NORMAL";
      this.generatorWatts = 110;

   };
   receiveMessage(message) {
      let response = { 
         message: message.name,
         results: message.commands

         
      }

      return response;

   };

}
  
  
 let rover = new Rover(100);
//  console.log(rover)

let commands = [
    new Command('MOVE', 4321),
    // new Command('STATUS_CHECK'),
    // new Command('MODE_CHANGE', 'LOW_POWER'),
    // new Command('MOVE', 3579),
    // new Command('STATUS_CHECK')
];
let message = new Message("Test message with two commands", commands);

// console.log(message)

function receiveMessage(message) {
    let response = {
        message: message.name
    }

    return response;

};
let response = rover.receiveMessage(message);

console.log(rover.receiveMessage(message));