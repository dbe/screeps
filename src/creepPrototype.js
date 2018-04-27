import { getMainSpawn, guid } from './utils.js';

class CreepPrototype {
  constructor (species, body, roles) {
    this.species = species;
    this.body = body;
    this.roles = roles;
  }

  spawn () {
    let memory = {
      roles: this.roles,
      species: this.species
    };

    getMainSpawn().spawnCreep(this.body, `${this.species}_${guid()}`, {memory: memory});
  }
}

export default CreepPrototype;
