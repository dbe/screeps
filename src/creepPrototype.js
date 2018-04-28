import { getMainSpawn, guid } from './utils.js';

class CreepPrototype {
  constructor (species, body, roles) {
    this.species = species;
    this.body = body;
    this.roles = roles;

    this.roleMemory = {};
    roles.forEach((role) => { this.roleMemory[role] = {}; });
  }

  spawn () {
    let memory = {
      roles: this.roles,
      roleMemory: this.roleMemory,
      species: this.species
    };

    getMainSpawn().spawnCreep(this.body, `${this.species}_${guid()}`, {memory: memory});
  }
}

export default CreepPrototype;
