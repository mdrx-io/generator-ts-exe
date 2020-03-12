const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  entry: {
    server: './build/index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
      },
    ],
  },
}
