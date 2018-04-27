import Creep from './Creep.js';

function run (creep) {
  updateMemory(creep);

  if (creep.memory.upgrading) {
    Creep.upgrade(creep);
  }

  return creep.memory.upgrading;
}

function updateMemory (creep) {
  if (creep.carry.energy === 0) {
    creep.memory.upgrading = false;
  } else if (creep.carry.energy === creep.carryCapacity) {
    creep.memory.upgrading = true;
  } else if (creep.memory.upgrading === undefined) {
    creep.memory.upgrading = false;
  }
}

export { run };
