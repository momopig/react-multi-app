const webpack = require('webpack')
const config = require('./config')
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production';
const {
  resolve
} = require('./utils')

const generateModConfig = mod => {
  const webpackConfig = {
    mode: 'production',
    entry: resolve(`src/modules/${mod}/index.js`),
    output: {
      path: resolve(`build/modules/${mod}`),
      publicPath: `/modules/${mod}/`,
      filename: `${mod}.js`,
      chunkFilename: '[name].[contentHash:5].chunk.js',
      library: `_${mod}`,
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@mod-a': resolve('src/modules/mod-a'),
        '@mod-b': resolve('src/modules/mod-b')
      }
    },
    optimization: {
      minimizer: [
      ]

    },
    plugins: [

    ]
  }
  return webpackConfig
}

module.exports = generateModConfig
