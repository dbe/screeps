function findSpawnsWithCapacity (room) {
  return room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
    }
  });
}

function findContainersWithCapacity (room) {
  return room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
    }
  });
}

function findContainersWithEnergy (room, amount) {
  return room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] >= amount;
    }
  });
}

function findRepairableStructures (room) {
  const targets = room.find(FIND_STRUCTURES, {
    filter: object => object.hits < object.hitsMax
  });

  targets.sort((a, b) => a.hits - b.hits);

  return targets;
}

function forEachCreep (fn) {
  for (var name in Game.creeps) {
    fn(Game.creeps[name]);
  }
}

function getMainSpawn () {
  return Game.spawns[Object.keys(Game.spawns)[0]];
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

export {
  findSpawnsWithCapacity,
  findContainersWithCapacity,
  findContainersWithEnergy,
  findRepairableStructures,
  forEachCreep,
  getMainSpawn,
  guid
};
