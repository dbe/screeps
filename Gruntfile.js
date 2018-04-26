module.exports = function(grunt) {

  var config = require('./.screeps.json')
  var branch = grunt.option('branch') || config.branch;
  var email = grunt.option('email') || config.email;
  var password = grunt.option('password') || config.password;
  var ptr = grunt.option('ptr') ? true : config.ptr

  grunt.loadNpmTasks('grunt-screeps');
  grunt.initConfig({
    screeps: {
      options: {
        server: {
          host: '10.0.1.16',
          port: 21025,
          http: true
        },
        email: email,
        password: password,
        branch: branch,
        ptr: ptr
      },
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
}
