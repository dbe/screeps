module.exports = {
  run: function (creep) {
    const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

    if (target) {
      setMemory(creep);

      if (creep.memory.building) {
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }

    return !!creep.memory.building;
  }
};

function setMemory (creep) {
  if (creep.carry.energy === 0) {
    creep.memory.building = false;
    creep.say('Done building');
  } else if (creep.carry.energy === creep.carryCapacity) {
    creep.memory.building = true;
    creep.say('Time to build!');
  }
}
