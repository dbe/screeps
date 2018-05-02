const CAPACITY_PER_CARRY = 50;
const SPENT_PER_WORK = 1;
const MOVEMENT_COST = 1;
const DISTANCE = 25;
const ENERGY_CAP = 500;

const BODY_COST_MAP = {
  'carry': 50,
  'move': 50,
  'work': 100
};

class Creep {
  constructor () {
    this.body = {
      'carry': 0,
      'move': 0,
      'work': 0
    };
    this.carrying = true;
  }

  add (bodyPart, count) {
    this.body[bodyPart] += count;
  }

  canAdd (bodyPart, count, ENERGY_CAP) {
    return this.bodyCost() + (BODY_COST_MAP[bodyPart] * count) <= ENERGY_CAP;
  }

  bodyCost () {
    return this.body['carry'] * BODY_COST_MAP['carry'] +
    this.body['move'] * BODY_COST_MAP['move'] +
    this.body['work'] * BODY_COST_MAP['work'];
  }

  move (distance) {
    let ticksPerDistance = Math.ceil(this.fatiguePerDistance() / this.fatiguePerTick());
    // console.log('fpd', this.fatiguePerDistance());
    // console.log('tpf', this.fatiguePerTick());
    // console.log('fpd', ticksPerDistance);
    return ticksPerDistance * distance;
  }

  workTillEmpty () {
    this.carrying = false;
    return this.carryCapacity() / (SPENT_PER_WORK * this.body['work']);
  }

  fatiguePerDistance () {
    return (this.body['move'] + this.body['work'] + (this.carrying ? this.body['carry'] : 0)) * MOVEMENT_COST;
  }

  fatiguePerTick () {
    return this.body['move'] * 2;
  }

  carryCapacity () {
    return CAPACITY_PER_CARRY * this.body['carry'];
  }

  toString () {
    let str = '';
    for (var part in this.body) {
      for (var i = 0; i < this.body[part]; i++) {
        str += ` ${part}`;
      }
    }

    return str;
  }
}

let maxCarryParts = Math.floor(ENERGY_CAP / BODY_COST_MAP['carry']);
let maxMoveParts = Math.floor(ENERGY_CAP / BODY_COST_MAP['move']);
let maxWorkParts = Math.floor(ENERGY_CAP / BODY_COST_MAP['work']);
let costList = [];

for (let carry = 0; carry <= maxCarryParts; carry++) {
  for (let move = 0; move <= maxMoveParts; move++) {
    for (var work = 0; work <= maxWorkParts; work++) {
      let creep = new Creep();
      if (creep.canAdd('carry', carry, ENERGY_CAP)) {
        creep.add('carry', carry);
      }

      if (creep.canAdd('move', move, ENERGY_CAP)) {
        creep.add('move', move);
      }

      if (creep.canAdd('work', work, ENERGY_CAP)) {
        creep.add('work', work);
      }

      let time = 0;
      time += creep.move(DISTANCE);
      // console.log('time: ', time);
      time += creep.workTillEmpty();
      // console.log('time: ', time);
      time += creep.move(DISTANCE);
      // console.log('time: ', time);
      let energyPerTime = creep.carryCapacity() / time;

      costList.push([energyPerTime, creep.toString()]);
    }
  }
}

costList = costList.filter(function (e) {
  return !isNaN(e[0]) && (e[0] !== Infinity) && (e[0] > 0);
});

costList = costList.sort(function (a, b) {
  return a[0] - b[0];
});

console.log(costList);
