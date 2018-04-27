class Creep {
  static transfer (creep, target, resource) {
    if (creep.transfer(target, resource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
  }

  static drop (creep, target, resource) {
    if (!_.isEqual(creep.pos, target.pos)) {
      creep.moveTo(target);
    } else {
      creep.drop(resource);
    }
  }

  static upgrade (creep) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }

  static withdraw (creep, container, resource) {
    if (creep.withdraw(container, resource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(container);
    }
  }
}

export default Creep;
