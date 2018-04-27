import Creep from './Creep.js';
import { findContainersWithEnergy } from './utils';

function run (creep) {
  if (creep.carry.energy < creep.carryCapacity) {
    let targets = findContainersWithEnergy(creep.room, creep.carryCapacity);

    if (targets.length > 0) {
      Creep.withdraw(creep, targets[0], RESOURCE_ENERGY);

      return true;
    }
  }

  return false;
}

export { run };
