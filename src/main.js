import { forEachCreep } from './utils.js';

// var Factory = require('./factory.js');

let loop = (function () {
  var roleMap = {
    'harvester': require('./role.harvester.js'),
    'mainFueler': require('./role.mainFueler.js'),
    'builder': require('./role.builder.js'),
    'upgrader': require('./role.upgrader.js')
  };

  const MAIN_FUELER = {
    name: 'mainFueler',
    roles: ['harvester', 'mainFueler', 'upgrader'],
    body: [WORK, CARRY, MOVE]
  };

  const BUILDER = {
    name: 'builder',
    roles: ['builder', 'harvester', 'mainFueler'],
    body: [WORK, CARRY, MOVE]
  };

  const CREEP_PROTOTYPES = {
    'mainFueler': MAIN_FUELER,
    'builder': BUILDER
  };

  const REQUIRED_CREEPS = {
    'mainFueler': 5,
    'builder': 2
  };

  function getNeededCreeps () {
    var currentCreeps = getCurrentCreeps();
    console.log('Current Creeps: ', currentCreeps);

    var neededCreeps = {};

    for (var name in REQUIRED_CREEPS) {
      var currentCount = currentCreeps[name] || 0;
      var needed = REQUIRED_CREEPS[name] - currentCount;
      if (needed > 0) {
        neededCreeps[name] = needed;
      }
    }

    return neededCreeps;
  }

  function spawnNewCreeps () {
    var neededCreeps = getNeededCreeps();
    console.log('Needed creeps: ', neededCreeps);

    for (var name in neededCreeps) {
      spawnCreep(name);
    }
  }

  function spawnCreep (name) {
    var creep = CREEP_PROTOTYPES[name];
    console.log('Spawning: ', creep.name);
    console.log('Creep: ', creep);

    var spawn = getMainSpawn();
    var memory = {
      roles: creep.roles,
      name: creep.name
    };

    spawn.spawnCreep(creep.body, `${creep.name}_${guid()}`, {memory: memory});
  }

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  function guid () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  function getMainSpawn () {
    return Game.spawns[Object.keys(Game.spawns)[0]];
  }

  return function () {
    spawnNewCreeps();

    forEachCreep(function (creep) {
      creep.memory.roles.some(function (role) {
        console.log('Performing role: ', role);

        // Will break if the role returned true
        return roleMap[role].run(creep);
      });
    });
  };
})();

// module.exports.loop = main();
export { loop };
