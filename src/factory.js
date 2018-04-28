import CountMap from './countMap.js';
import CreepPrototype from './creepPrototype.js';
import { forEachCreep } from './utils.js';
import * as PN from './prototypeNames.js';
import * as RN from './roleNames.js';

// TODO: Fix up ordering here so that behavior is consistent. I think harvesting roles should be last
// TODO: Also make the upgrader (and other creeps body's dynamic based on distances etc) (eg: close upgrade have more work)
const PROTOTYPE_MAP = {};
PROTOTYPE_MAP[PN.BUILDER] = new CreepPrototype(PN.BUILDER, [WORK, CARRY, MOVE], [RN.BUILDER, RN.LEECHER, RN.HARVESTER]);
PROTOTYPE_MAP[PN.HARVESTER] = new CreepPrototype(PN.HARVESTER, [WORK, WORK, MOVE, MOVE], [RN.HARVESTER]);
PROTOTYPE_MAP[PN.STATIC_HARVESTER] = new CreepPrototype(PN.STATIC_HARVESTER, [WORK, WORK, MOVE, CARRY], [RN.STATIC_HARVESTER]);
PROTOTYPE_MAP[PN.REPAIRER] = new CreepPrototype(PN.REPAIRER, [WORK, CARRY, CARRY, MOVE, MOVE], [RN.REPAIRER, RN.BUILDER, RN.LEECHER, RN.HARVESTER]);
PROTOTYPE_MAP[PN.SUPPLIER] = new CreepPrototype(PN.SUPPLIER, [WORK, WORK, CARRY, MOVE], [RN.HARVESTER, RN.SUPPLIER, RN.BUILDER]);
PROTOTYPE_MAP[PN.SUPPLIER_LEVEL_2] = new CreepPrototype(PN.SUPPLIER_LEVEL_2, [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], [RN.HARVESTER, RN.SUPPLIER, RN.BUILDER]);
PROTOTYPE_MAP[PN.UPGRADER] = new CreepPrototype(PN.UPGRADER, [CARRY, MOVE, WORK, WORK], [RN.UPGRADER, RN.LEECHER, RN.HARVESTER]);

const BUILD_ORDER = [
  // PN.SUPPLIER,
  PN.BUILDER,
  // PN.UPGRADER,
  PN.REPAIRER,
  // PN.SUPPLIER_LEVEL_2
  PN.STATIC_HARVESTER
];

class Factory {
  static spawnNextCreep () {
    let current = getCurrentCreeps();
    BUILD_ORDER.some((species) => {
      if (current.dec(species) < 0) {
        PROTOTYPE_MAP[species].spawn();
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
