import CountMap from './countMap.js';
import CreepPrototype from './creepPrototype.js';
import { forEachCreep } from './utils.js';

const SUPPLIER = 'supplier';
const BUILDER = 'builder';
const UPGRADER = 'upgrader';

const PROTOTYPE_MAP = {
  SUPPLIER: new CreepPrototype('supplier', [WORK, CARRY, MOVE], ['harvester', 'supplier']),
  BUILDER: new CreepPrototype('builder', [WORK, CARRY, MOVE], ['builder', 'harvester', 'supplier']),
  UPGRADER: new CreepPrototype('upgrader', [WORK, CARRY, MOVE], ['upgrader', 'harvester', 'supplier'])
};

const BUILD_ORDER = [
  SUPPLIER,
  BUILDER,
  UPGRADER
];

class Factory {
  static spawnNextCreep () {
    let current = getCurrentCreeps();
    BUILD_ORDER.some((species) => {
      console.log("Investigating species in build order: ", species);

      if (current.dec(species) < 0) {
        console.log('current: ', JSON.stringify(current));
        console.log('current.dec(species) was less than 0 for species: ', species);
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
