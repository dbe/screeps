import Creep from './Creep.js';
import { findClosestRepairable } from './utils';

function run (creep) {
  let target = findClosestRepairable(creep.pos);

  if (target) {
    setMemory(creep);

    if (creep.memory.repairing) {
      Creep.repair(creep, target);
      return true;
    }
  }

  return false;
}

function setMemory (creep) {
  if (creep.carry.energy === 0) {
    creep.memory.repairing = false;
    creep.say('Done repairing');
  } else if (creep.carry.energy === creep.carryCapacity) {
    creep.memory.repairing = true;
    creep.say('Time to repair!');
  }
}

export { run };
