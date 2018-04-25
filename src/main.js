const uuidv1 = require('uuid/v1');

var roleMap = {
  'harvester': require('./role.harvester.js'),
  'mainFueler': require('./role.mainFueler.js'),
  'builder': require('./role.builder.js')
};

module.exports.loop = function () {
  spawnNewCreeps();

  forEachCreep(function (creep) {
    creep.memory.roles.some(function (role) {
      console.log('Performing role: ', role);

      // Will break if the role returned true
      return roleMap[role].run(creep);
    });
  });
};

function forEachCreep (fn) {
  for (var name in Game.creeps) {
    fn(Game.creeps[name]);
  }
}

function spawnNewCreeps () {
  var neededCreeps = getNeededCreeps();
  console.log('Needed creeps: ', neededCreeps);

  for (var name in neededCreeps) {
    spawnCreep(name);
  }
}

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

function getCurrentCreeps () {
  var currentCreeps = {};

  forEachCreep(function (creep) {
    var name = creep.memory.name;

    if (currentCreeps[name] === undefined) {
      currentCreeps[name] = 0;
    }

    currentCreeps[name]++;
  });

  return currentCreeps;
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

  spawn.spawnCreep(creep.body, `${creep.name}_${uuidv1()}`, {memory: memory});
}

function getMainSpawn () {
  return Game.spawns[Object.keys(Game.spawns)[0]];
}

const MAIN_FUELER = {
  name: 'mainFueler',
  roles: ['harvester', 'mainFueler'],
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
  'mainFueler': 2,
  'builder': 1
};
