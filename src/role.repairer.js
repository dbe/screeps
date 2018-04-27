import Creep from './Creep.js';
import { findRepairableStructures } from './utils';

function run (creep) {
  let targets = findRepairableStructures(creep.room);

  if (targets.length > 0) {
    setMemory(creep);

    if (creep.memory.repairing) {
      Creep.repair(creep, targets[0]);
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
