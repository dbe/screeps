// Static Harvester:
// If I have room to harvest, I should set out to harvest:
//  1: If I am harvesting:
//    If I’m full I should set harvesting to false (return false)
//    If I’m not full, I should harvest (return true)
//
//  2: Otherwise, If I have a target:
//    If I’ve reached my target, I should clear my target, set harvesting to true and do the above checks (Goto: 1)
//    Otherwise, I should move towards my target (return true)
//
//  Otherwise, I should see if there is a suitable target to set and set it (Goto: 2)
//
//  Otherwise I cannot do work as a static harvester and I should return false (return false)
import { STATIC_HARVESTER } from './roleNames.js';

class StaticHarvester {
  constructor (creep) {
    this.creep = creep;
    this.mem = creep.memory.roleMemory[STATIC_HARVESTER];
  }

  run () {
    if (this.canHarvest()) {
      if (this.amHarvesting()) {
        return this.doHarvest();
      } else {
        this.mem.sourceId = this.creep.pos.findClosestByRange(FIND_SOURCES).id;
        this.mem.harvesting = true;
        return this.doHarvest();
      }
    }
  }

  doHarvest () {
    if (this.amFull()) {
      this.creep.drop(RESOURCE_ENERGY);
    } else {
      let source = Game.getObjectById(this.mem.sourceId);
      if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
      return true;
    }
  }

  canHarvest () {
    return this.creep.carry.energy < this.creep.carryCapacity || this.creep.carryCapacity === 0 || this.amHarvesting();
  }

  amFull () {
    return this.creep.carryCapacity > 0 && this.creep.carry.energy === this.creep.carryCapacity;
  }

  amHarvesting () {
    return !!this.mem.harvesting;
  }
}

export default StaticHarvester;
