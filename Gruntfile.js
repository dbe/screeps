const PRIVATE_SERVER_OPTIONS = {
  host: '10.0.1.16',
  port: 21025,
  http: true
};

module.exports = function (grunt) {
  var config = require('./.screeps.json');
  var branch = grunt.option('branch') || config.branch;
  var email = grunt.option('email') || config.email;
  var password = grunt.option('password') || config.password;
  var ptr = grunt.option('ptr') ? true : config.ptr;

  var options = {
    email: email,
    password: password,
    branch: branch,
    ptr: ptr
  };

  if (grunt.option('private')) {
    options['server'] = PRIVATE_SERVER_OPTIONS;
  }

  grunt.loadNpmTasks('grunt-screeps');
  grunt.initConfig({
    screeps: {
      options: options,
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**/*.{js,wasm}'],
            flatten: true
          }
        ]
      }
    }
  });
};
