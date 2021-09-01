// generated from bt (json) file

getBtRoot = function (blackboard: any, notepad: any, result: any) {
  const Sequ_5c663278 = new BehaviorClasses.Sequence({
    name: 'Root',
    id: '5c663278-10f2-4257-ae2b-27c85bb1a80b',
    layout: { "x": 410, "y": 70 },
  });

  const Exec_a21b7208 = new BehaviorClasses.ExecuteScript({
    name: 'Init',
    exec: () => {
      notepad.vCooldownTime = 500;
      notepad.hCooldownTime = 200;
      notepad.tCooldownTime = 200;
      const padCenter = blackboard.controller.landingPadRect.x + blackboard.controller.landingPadRect.width / 2;
      const padY = blackboard.controller.landingPadRect.y;
      notepad.target = {
        x: padCenter,
        y: padY,
        velocity: {
          x: 0,
          y: 0
        }
      };
      console.log('Init.', blackboard, notepad, result);
      console.log(`target: (${notepad.target.x}, ${notepad.target.y}) <${notepad.target.velocity.x}, ${notepad.target.velocity.y}>`);
    },
    id: 'a21b7208-c19d-4db6-87df-f2a3e6a36087',
    layout: { "x": 318, "y": 218 },
  });

  const Para_d3b2ccc1 = new BehaviorClasses.Parallel({
    name: 'Flight',
    succeedOnOne: false,
    id: 'd3b2ccc1-bd6f-450b-a8fe-d62b5de8a368',
    layout: { "x": 510, "y": 219 },
  });

  const Sequ_ff0bfe70 = new BehaviorClasses.Sequence({
    name: 'Vertical',
    id: 'ff0bfe70-05f2-4d39-966a-e6bc07b2f16c',
    layout: { "x": 312, "y": 384 },
  });

  const Time_99d8fe74 = new BehaviorClasses.TimeoutJs({
    name: 'VCooldown',
    getTime: () => notepad.vCooldownTime,
    id: '99d8fe74-b456-4ef0-9054-cfc9c88e3be3',
    layout: { "x": 88, "y": 549 },
  });

  const Exec_ac0168f1 = new BehaviorClasses.ExecuteScript({
    name: 'VThrustOn',
    exec: () => {
      console.log(`VThrustOn`);
      blackboard.keys.ArrowUp = 'down';
    },
    id: 'ac0168f1-a455-4377-8d79-ef42b45e02cc',
    layout: { "x": 254, "y": 551 },
  });

  const Exec_4dbd2b2a = new BehaviorClasses.ExecuteScript({
    name: 'VThrustOff',
    exec: () => {
      // console.log(`VThrustOff`, blackboard);
      blackboard.keys.ArrowUp = 'up';
    },
    id: '4dbd2b2a-21ee-47d6-93c6-3b457e8d5337',
    layout: { "x": 421, "y": 551 },
  });

  const Sequ_db6ebc20 = new BehaviorClasses.Sequence({
    name: 'Horizontal',
    id: 'db6ebc20-f277-4f62-8ea5-5bf7340ac756',
    layout: { "x": 523, "y": 410 },
  });

  const Time_6927b270 = new BehaviorClasses.TimeoutJs({
    name: 'HCooldown',
    getTime: () => notepad.hCooldownTime,
    id: '6927b270-3494-4808-816a-f20a8f8ee11a',
    layout: { "x": 606, "y": 702 },
  });

  const Exec_a006cc01 = new BehaviorClasses.ExecuteScript({
    name: 'HThrustOn',
    exec: () => {
      // console.log(`HThrustOn`, blackboard);
      const xVel = blackboard.controller.shipVelocity.x;
      const xVelTarget = notepad.target.velocity.x;

      if (xVel > xVelTarget) {
        blackboard.keys.ArrowLeft = 'down';
      } else if (xVel < xVelTarget) {
        blackboard.keys.ArrowRight = 'down';
      }
    },
    id: 'a006cc01-a249-47b4-a9a9-51554b66ec07',
    layout: { "x": 770, "y": 700 },
  });

  const Exec_1f813ac3 = new BehaviorClasses.ExecuteScript({
    name: 'HThrustOff',
    exec: () => {
      // console.log(`HThrustOff`, blackboard);
      blackboard.keys.ArrowLeft = 'up';
      blackboard.keys.ArrowRight = 'up';
    },
    id: '1f813ac3-f2e5-4ed7-a13c-8a58206340dd',
    layout: { "x": 939, "y": 698 },
  });

  const Sequ_c37510fd = new BehaviorClasses.Sequence({
    name: 'Target',
    id: 'c37510fd-3f7b-49b8-8d3b-c2d39b78aad1',
    layout: { "x": 830, "y": 322 },
  });

  const Time_eea4549b = new BehaviorClasses.TimeoutJs({
    name: 'TCooldown',
    getTime: () => notepad.tCooldownTime,
    id: 'eea4549b-461b-4adb-9ec2-1d449cfc08d5',
    layout: { "x": 729, "y": 504 },
  });

  const Exec_5e7005b5 = new BehaviorClasses.ExecuteScript({
    name: 'AdjustTarget',
    exec: () => {
      const padCenter = blackboard.controller.landingPadRect.x + blackboard.controller.landingPadRect.width / 2;
      const padY = blackboard.controller.landingPadRect.y;
      const shipX = blackboard.controller.shipCoords.x + 20;
      const hOffset = padCenter - shipX;
      notepad.target.x = padCenter;
      notepad.target.y = padY;

      if (padY - blackboard.controller.shipCoords.y > 20) {
        // set target higher at first
        notepad.target.y = padY - 20;
      }

      notepad.target.velocity.x = hOffset / 50;
      console.log(`target: (${notepad.target.x}, ${notepad.target.y}) <${notepad.target.velocity.x}, ${notepad.target.velocity.y}>`);
      const shipAltitude = notepad.target.y - blackboard.controller.shipCoords.y;
      notepad.target.velocity.y = -10;

      if (shipAltitude < blackboard.controller.world.height / 2) {
        notepad.target.velocity.y = -3;
      }

      if (shipAltitude < 60 && Math.abs(hOffset) > 70) {
        notepad.target.velocity.y = 3;
      } else if (shipAltitude < 20) {
        notepad.target.velocity.y = 0;
      }

      notepad.hCooldownTime = shipAltitude / 2;
      notepad.vCooldownTime = shipAltitude / 3;
      notepad.tCooldownTime = shipAltitude / 3;
      console.log(`  vCool: ${notepad.vCooldownTime}: hCool: ${notepad.hCooldownTime} `);
    },
    id: '5e7005b5-b1f0-4a2a-ba6c-2f95cf8808be',
    layout: { "x": 931, "y": 499 },
  });

  const Whil_1eb4d866 = new DecoratorClasses.WhileCondition({
    name: 'FlightLoop',
    init: () => { },
    conditional: () => {
      return true;
    },
    id: '1eb4d866-2672-4806-9b8d-d0e34ccd0833',
    layout: undefined,
  });

  const Whil_7d9c2ef7 = new DecoratorClasses.WhileCondition({
    name: 'VThrustHold',
    init: () => { },
    conditional: () => {
      let hold = false;
      const vShip = blackboard.controller.shipVelocity.y;
      const vTarget = notepad.target.velocity.y;

      if (vShip < vTarget) {
        // console.log(`velocity too high: ${blackboard.controller.shipVelocity.y} holding.`);
        hold = true;
      }

      console.log(`  VThrustHold: ${hold}: ${vShip} ${vTarget}`);
      return hold;
    },
    id: '7d9c2ef7-cbbe-423c-b6a8-b329ec48db20',
    layout: undefined,
  });

  const Whil_36da6b7c = new DecoratorClasses.WhileCondition({
    name: 'HThrustHold',
    init: () => {
      notepad.HThrustStart = Date.now();
    },
    conditional: () => {
      let hold = false; // const elapsed = Date.now() - notepad.HThrustStart;
      // if (elapsed < 50) {
      //     hold = true;
      // }

      const velocityOffset = blackboard.controller.shipVelocity.x - notepad.target.velocity.x;

      if (Math.abs(velocityOffset) > 1) {
        hold = true;
      }

      return hold;
    },
    id: '36da6b7c-3de9-4e81-af59-e932ed7d4cbd',
    layout: undefined,
  });

  const Whil_dda7e6b6 = new DecoratorClasses.WhileCondition({
    init: () => {
    },
    conditional: () => {
      return true;
    },
    name: 'vLoop',
    id: 'dda7e6b6-e40b-46f2-8c49-be24016d62aa',
    layout: undefined,
  });

  const Whil_cdddafaa = new DecoratorClasses.WhileCondition({
    init: () => {
    },
    conditional: () => {
      return true;
    },
    name: 'hLoop',
    id: 'cdddafaa-a5be-4c68-9011-b1e3bede5f73',
    layout: undefined,
  });

  const Whil_a3a67154 = new DecoratorClasses.WhileCondition({
    init: () => {
    },
    conditional: () => {
      return true;
    },
    name: 'tLoop',
    id: 'a3a67154-59df-44d5-9213-3b46cec09bcf',
    layout: undefined,
  });

  Sequ_5c663278.children = [Exec_a21b7208, Para_d3b2ccc1];
  Para_d3b2ccc1.children = [Sequ_ff0bfe70, Sequ_db6ebc20, Sequ_c37510fd];
  Sequ_ff0bfe70.children = [Time_99d8fe74, Exec_ac0168f1, Exec_4dbd2b2a];
  Sequ_db6ebc20.children = [Time_6927b270, Exec_a006cc01, Exec_1f813ac3];
  Sequ_c37510fd.children = [Time_eea4549b, Exec_5e7005b5];


  Para_d3b2ccc1.decorators = [Whil_1eb4d866];
  Sequ_ff0bfe70.decorators = [Whil_dda7e6b6];
  Exec_ac0168f1.decorators = [Whil_7d9c2ef7];
  Sequ_db6ebc20.decorators = [Whil_cdddafaa];
  Exec_a006cc01.decorators = [Whil_36da6b7c];
  Sequ_c37510fd.decorators = [Whil_a3a67154];

  return Sequ_5c663278;

}
