import Creep from './Creep';
import { findSpawnWithCapacity } from './utils';

function run (creep) {
  let targets = findSpawnWithCapacity(creep.room);

  if (targets.length > 0) {
    Creep.transfer(creep, targets[0], RESOURCE_ENERGY);
  }

  return targets.length > 0;
}

export { run };
