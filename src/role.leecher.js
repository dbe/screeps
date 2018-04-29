import Creep from './Creep.js';
import { findResourcesyOnGround, findContainersWithEnergy } from './utils';

function run (creep) {
  if (creep.carry.energy < creep.carryCapacity) {
    let target = creep.pos.findClosestByPath(findResourcesyOnGround(creep.room, creep.carryCapacity));
    if (target) {
      Creep.pickup(creep, target);

      return true;
    }

    target = creep.pos.findClosestByPath(findContainersWithEnergy(creep.room, creep.carryCapacity));
    if (target) {
      Creep.withdraw(creep, target, RESOURCE_ENERGY);

      return true;
    }
  }

  return false;
}

export { run };
