import CountMap from './countMap.js';
import CreepPrototype from './creepPrototype.js';
import { forEachCreep } from './utils.js';
import * as SN from './speciesNames.js';

const BUILD_ORDER = [
  SN.SUPPLIER,
  SN.STATIC_HARVESTER,
  SN.BUILDER,
  SN.UPGRADER,
  SN.REPAIRER
];

class Factory {
  static spawnNextCreep () {
    let current = getCurrentCreeps();
    BUILD_ORDER.some((species) => {
      if (current.dec(species) < 0) {
        let proto = new CreepPrototype(species);
        proto.spawn();
        return true;
      }
    });
  }
}

function getCurrentCreeps () {
  let countMap = new CountMap();

  forEachCreep(function (creep) {
    countMap.inc(creep.memory.species);
  });

  return countMap;
}

export default Factory;
