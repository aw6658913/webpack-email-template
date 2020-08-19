const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'publish'),
    library:  'react', // 以一个库的形式导出
    filename: '[name].dll.js'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'react',
      path: path.resolve(__dirname, 'publish/manifest.json')
    })
  ]
}