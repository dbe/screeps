var roleMap = {
  'collector' : require('role.collector'),
  'spawnFueler' : require('role.spawnFueler'),
  'buildingFueler': require('role.buildingFueler')
}

module.exports.loop = function () {
  spawnNewCreeps();

  forEachCreep(function(creep) {
    console.log("For creep: ", creep);

    creep.memory.roles.forEach(function(role) {
      console.log("Performing role: ", role);

      var suceeded = roleMap[role].run(creep);
      if(suceeded) {
        return;
      }
    });
  });
}


function forEachCreep(fn) {
  for(var name in Game.creeps) {
    fn(Game.creeps[name]);
  }
}

function spawnNewCreeps() {
  forEachCreep(function(creep) {
    console.log("Creep: ", creep.memory.name);
  });
}

REQUIRED_CREEPS = [
  {
    name: 'spawnFueler',
    prototype: {
      roles: ['collector', 'spawnFueler'],
      body: [WORK, CARRY, MOVE]
    },
    count: 2
  },
  {
    name: 'buildingFueler',
    prototype: {
      roles: ['collector', 'buildingFueler'],
      body: [WORK, CARRY, MOVE]
    },
    count: 1
  }
];
