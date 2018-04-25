module.exports = {
  run: function (creep) {
    if (creep.carry.energy === 0) {
      creep.memory.upgrading = false;
    } else if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.upgrading = true;
    } else if (creep.memory.upgrading === undefined) {
      creep.memory.upgrading = false;
    }

    if (creep.memory.upgrading) {
      var controller = Room.controller;
      if (creep.upgrade(controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
      return true;
    } else {
      return false;
    }
  }
};