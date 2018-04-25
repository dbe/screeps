module.exports = {
  run: function (creep) {
    const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

    if (target && creep.carry.energy === creep.carryCapacity) {
      if (creep.build(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }

      return true;
    } else {
      return false;
    }
  }
};
