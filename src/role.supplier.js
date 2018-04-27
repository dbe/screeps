import Creep from './Creep';
import { findContainersWithCapacity, findSpawnsWithCapacity } from './utils';

function run (creep) {
  let targets = findSpawnsWithCapacity(creep.room);
  if (targets.length > 0) {
    Creep.transfer(creep, targets[0], RESOURCE_ENERGY);
    return true;
  }

  targets = findContainersWithCapacity(creep.room);
  if (targets.length > 0) {
    Creep.drop(creep, targets[0], RESOURCE_ENERGY);
    return true;
  }

  return false;
}

export { run };
