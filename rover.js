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
      let results = [];

      for (let i = 0; i < message.commands.length; i++) {
          if (message.commands[i].commandType === "STATUS_CHECK") {
              let statusUpdate = {
                  completed: true,
                  roverStatus: {
                      mode: this.mode,
                      generatorWatts: this.generatorWatts,
                      position: this.position
                  }
              };
              results.push(statusUpdate);
          } else if (message.commands[i].commandType === "MODE_CHANGE") {
              this.mode = "LOW_POWER";

              let modeUpdate = {
                  completed: true
              };
              results.push(modeUpdate)

          } if (message.commands[i].commandType === "MOVE" && this.mode === "LOW_POWER") {
            let moveUpdate = {
                completed: false
            };
            results.push(moveUpdate);

          } else if (message.commands[i].commandType === "MOVE") {
            this.position = message.commands[i].value
            let moveUpdate = {
                completed: true
            }
            results.push(moveUpdate);     

          };

      };

      let response = {
         message: message.name,
         results: results
      }
      return response
   };

};

module.exports = Rover;