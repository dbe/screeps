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

  // TODO: Make this take into account the species and amount of available energy in the room
  static determineBody (species) {
    return [WORK, WORK, CARRY, MOVE];
  }
}

export default CreepPrototype;
