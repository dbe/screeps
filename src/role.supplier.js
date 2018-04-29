import Creep from './Creep';
import { findContainersWithCapacity, findExtensionsWithCapacity, findSpawnsWithCapacity } from './utils';

function run (creep) {
  if (creep.carry.energy === creep.carryCapacity) {
    let targets = findSpawnsWithCapacity(creep.room);
    if (targets.length > 0) {
      Creep.transfer(creep, targets[0], RESOURCE_ENERGY);
      return true;
    }

    targets = findExtensionsWithCapacity(creep.room);
    if (targets.length > 0) {
      Creep.transfer(creep, targets[0], RESOURCE_ENERGY);
      return true;
    }

    targets = findContainersWithCapacity(creep.room);
    if (targets.length > 0) {
      Creep.transfer(creep, targets[0], RESOURCE_ENERGY);
      return true;
    }
  }

  return false;
}

export { run };
