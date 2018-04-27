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
      console.log('Investigating species in build order: ', species);
      console.log('current: ', JSON.stringify(current));
      let oreo = current.dec(species);
      console.log('oreo: ', oreo);

      if (oreo < 0) {
        console.log('current: ', JSON.stringify(current));
        console.log('current.dec(species) was less than 0 for species: ', species);
        console.log('PROTOTYPE_MAP: ', JSON.stringify(PROTOTYPE_MAP));
        console.log('PROTOTYPE_MAP[species]: ', PROTOTYPE_MAP[species]);
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
