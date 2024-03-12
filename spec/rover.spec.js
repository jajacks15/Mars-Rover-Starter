const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {

  test("constructor sets position and default values for mode and generatorWatts", function () {
    let rover = new Rover(98382);

    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  test("response returned by receiveMessage contains the name of the message", function () {
    let commands = [new Command('MOVE', 3579), new Command('STATUS_CHECK')];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382)
    let response = rover.receiveMessage(message);
    expect(response.message).toBe("Test message with two commands");
  });

  test("response returned by receiveMessage include two results if two commands are sent in the message", function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382)
    let response = rover.receiveMessage(message);
    expect(response.results).toHaveLength(2);
  });

  test("responds correctly to the status check command", function () {
      let commands = [new Command('STATUS_CHECK')];
      let message = new Message("Test message with one command", commands);
      let rover = new Rover(98382)
      let response = rover.receiveMessage(message);
      let roverStatus = response.results[0].roverStatus

      expect(response.results).toEqual(expect.objectContaining({}));
      expect(roverStatus.mode).toBe("NORMAL");
      expect(roverStatus.generatorWatts).toBe(110);
      expect(roverStatus.position).toBe(98382)
  });

  test("responds correctly to the mode change command", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK') ];
    let message = new Message("Test message with one command", commands);
    let rover = new Rover(98382)
    let response = rover.receiveMessage(message);
    let modeUpdate = response.results[0];

    expect(modeUpdate.completed).toBe(true);
    expect(rover.mode).toBe("LOW_POWER");
  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 3579)];
    let message = new Message("Test message with one command", commands);
    let rover = new Rover(98382)
    let response = rover.receiveMessage(message);
    let moveUpdate = response.results[1];

    expect(moveUpdate.completed).toBe(false)
  });

  test("responds with the position for the move command", function(){
    let commands = [new Command('MOVE', 3579)];
    let message = new Message("Test message with one command", commands);
    let rover = new Rover(98382)
    let response = rover.receiveMessage(message);
    let moveUpdate = response.results[0];

    expect(moveUpdate.completed).toBe(true);
    expect(rover.position).toBe(3579);
  });



});
