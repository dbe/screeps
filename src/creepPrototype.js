import { getMainSpawn, guid } from './utils.js';
import * as RN from './roleNames.js';
import * as SN from './speciesNames.js';

// TODO: Fix up ordering here so that behavior is consistent. I think harvesting roles should be last
// TODO: Also make the upgrader (and other creeps body's dynamic based on distances etc) (eg: close upgrade have more work)
const ROLE_MAP = {};
ROLE_MAP[SN.BUILDER] = [RN.BUILDER, RN.UPGRADER, RN.LEECHER, RN.HARVESTER];
ROLE_MAP[SN.STATIC_HARVESTER] = [RN.STATIC_HARVESTER];
ROLE_MAP[SN.REPAIRER] = [RN.REPAIRER, RN.BUILDER, RN.UPGRADER, RN.LEECHER, RN.HARVESTER];
ROLE_MAP[SN.SUPPLIER] = [RN.SUPPLIER, RN.BUILDER, RN.HARVESTER, RN.UPGRADER];
ROLE_MAP[SN.UPGRADER] = [RN.UPGRADER, RN.LEECHER, RN.HARVESTER];

class CreepPrototype {
  constructor (species) {
    this.species = species;
    this.body = CreepPrototype.determineBody(species);
    this.roles = ROLE_MAP[species];

    this.roleMemory = {};
    this.roles.forEach((role) => { this.roleMemory[role] = {}; });
  }

  spawn () {
    let memory = {
      roles: this.roles,
      roleMemory: this.roleMemory,
      species: this.species
    };

    getMainSpawn().spawnCreep(this.body, `${this.species}_${guid()}`, {memory: memory});
  }

  // TODO: This method has a ton of potential for optimization. Ordering of body parts is also important
  // For now, the "else" just handles 550 energy (5 extenders)
  // scripts/bodySimulator.js holds code to figure out the optimal layout given a workflow
  // In the 550 energy part of the default case, only 500 energy is used because the last carry would make things slower (according to the simulator)
  static determineBody (species) {
    const availableEnergy = getMainSpawn().room.energyCapacityAvailable;
    let body = [];

    switch (species) {
      case SN.STATIC_HARVESTER:
        if (availableEnergy <= 300) {
          body = [MOVE, MOVE, WORK, WORK];
        } else {
          body = [MOVE, WORK, WORK, WORK, WORK, WORK];
        }
        break;
      default:
        if (availableEnergy <= 300) {
          body = [CARRY, CARRY, CARRY, MOVE, WORK];
        } else {
          body = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, WORK];
        }
    }

    return body;
  }
}

export default CreepPrototype;
