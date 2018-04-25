module.exports = {
  run: function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var source = creep.room.find(FIND_SOURCES)[0];
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        console.log('Source not in range');
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }

      return true;
    } else {
      return false;
    }
  }
};
