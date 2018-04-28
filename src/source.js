class Source {
  static adjacentContainers (source) {
    return source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: {structureType: STRUCTURE_CONTAINER}
    });
  }
}

export default Source;
