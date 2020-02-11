const path = require('path');

module.exports = {
  mode: 'development',
  entry:'./src/index.js',
  plugins: [ ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
};
