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
}

export default Creep;
