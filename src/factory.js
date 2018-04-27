import CountMap from './countMap.js';
import CreepPrototype from './creepPrototype.js';
import { forEachCreep } from './utils.js';

const BUILDER = 'builder';
const HARVESTER = 'harvester';
const REPAIRER = 'repairer';
const SUPPLIER = 'supplier';
const UPGRADER = 'upgrader';

const PROTOTYPE_MAP = {};
PROTOTYPE_MAP[BUILDER] = new CreepPrototype(BUILDER, [WORK, CARRY, MOVE], ['builder', 'harvester', 'supplier']);
PROTOTYPE_MAP[HARVESTER] = new CreepPrototype(HARVESTER, [WORK, WORK, MOVE, MOVE], ['harvester']);
PROTOTYPE_MAP[REPAIRER] = new CreepPrototype(REPAIRER, [WORK, CARRY, CARRY, MOVE, MOVE], ['repairer', 'leecher']);
PROTOTYPE_MAP[SUPPLIER] = new CreepPrototype(SUPPLIER, [WORK, WORK, CARRY, MOVE], ['harvester', 'supplier']);
PROTOTYPE_MAP[UPGRADER] = new CreepPrototype(UPGRADER, [CARRY, CARRY, MOVE, MOVE, WORK], ['upgrader', 'leecher']);

const BUILD_ORDER = [
  // HARVESTER,
  SUPPLIER,
  BUILDER,
  UPGRADER,
  REPAIRER
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
