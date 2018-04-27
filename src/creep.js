class Creep {
  static transfer (creep, target, resource) {
    if (creep.transfer(target, resource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
  }
}

export default Creep;
