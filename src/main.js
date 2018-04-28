import { forEachCreep } from './utils.js';
import Factory from './factory.js';

let roleMap = {
  'builder': require('./role.builder.js'),
  'harvester': require('./role.harvester.js'),
  'leecher': require('./role.leecher.js'),
  'static_harvester': require('./role.staticHarvester.js'),
  'supplier': require('./role.supplier.js'),
  'repairer': require('./role.repairer.js'),
  'upgrader': require('./role.upgrader.js')
};

let loop = (function () {
  return function () {
    Factory.spawnNextCreep();

    forEachCreep(function (creep) {
      creep.memory.roles.some(function (role) {
        // console.log('Performing role: ', role);

        // Will break if the role returned true
        let Klass = roleMap[role].default;
        let roleInstance = new Klass(creep);
        return roleInstance.run();
      });
    });
  };
})();

// module.exports.loop = main();
export { loop };
