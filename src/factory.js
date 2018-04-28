import CountMap from './countMap.js';
import CreepPrototype from './creepPrototype.js';
import { forEachCreep } from './utils.js';

const BUILDER = 'builder';
const HARVESTER = 'harvester';
const REPAIRER = 'repairer';
const SUPPLIER = 'supplier';
const SUPPLIER_LEVEL_2 = 'supplier_level_2';
const UPGRADER = 'upgrader';

// TODO: Fix up ordering here so that behavior is consistent. I think harvesting roles should be last
// TODO: Also make the upgrader (and other creeps body's dynamic based on distances etc) (eg: close upgrade have more work)
const PROTOTYPE_MAP = {};
PROTOTYPE_MAP[BUILDER] = new CreepPrototype(BUILDER, [WORK, CARRY, MOVE], ['builder', 'leecher', 'harvester']);
PROTOTYPE_MAP[HARVESTER] = new CreepPrototype(HARVESTER, [WORK, WORK, MOVE, MOVE], ['harvester']);
PROTOTYPE_MAP[REPAIRER] = new CreepPrototype(REPAIRER, [WORK, CARRY, CARRY, MOVE, MOVE], ['repairer', 'builder', 'leecher', 'harvester']);
PROTOTYPE_MAP[SUPPLIER] = new CreepPrototype(SUPPLIER, [WORK, WORK, CARRY, MOVE], ['harvester', 'supplier', 'builder']);
PROTOTYPE_MAP[SUPPLIER_LEVEL_2] = new CreepPrototype(SUPPLIER_LEVEL_2, [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], ['harvester', 'supplier', 'builder']);
PROTOTYPE_MAP[UPGRADER] = new CreepPrototype(UPGRADER, [CARRY, MOVE, WORK, WORK], ['upgrader', 'leecher', 'harvester']);

const BUILD_ORDER = [
  // HARVESTER,
  SUPPLIER,
  BUILDER,
  UPGRADER,
  REPAIRER,
  SUPPLIER_LEVEL_2
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
