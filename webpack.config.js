const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: 'main',
    libraryTarget: 'umd'
  },
  mode: 'development'
};
