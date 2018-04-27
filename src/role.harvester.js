module.exports = {
  run: function (creep) {
    // TODO: This handles both cases of a normal hauling harvester, and a mega harvester (no carry). Should factor those out somehow
    if (creep.carry.energy < creep.carryCapacity || creep.carryCapacity === 0) {
      var source = creep.pos.findClosestByRange(FIND_SOURCES);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }

      return true;
    } else {
      return false;
    }
  }
};
