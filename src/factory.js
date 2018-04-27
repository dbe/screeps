import CountMap from './countMap.js';
import CreepPrototype from './creepPrototype.js';
import { forEachCreep } from './utils.js';

const SUPPLIER = 'supplier';
const BUILDER = 'builder';
const UPGRADER = 'upgrader';

const PROTOTYPE_MAP = {};
PROTOTYPE_MAP[SUPPLIER] = new CreepPrototype('supplier', [WORK, CARRY, MOVE], ['harvester', 'supplier']);
PROTOTYPE_MAP[BUILDER] = new CreepPrototype('builder', [WORK, CARRY, MOVE], ['builder', 'harvester', 'supplier']);
PROTOTYPE_MAP[UPGRADER] = new CreepPrototype('upgrader', [WORK, CARRY, MOVE], ['upgrader', 'harvester', 'supplier']);

const BUILD_ORDER = [
  SUPPLIER,
  BUILDER,
  UPGRADER
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
