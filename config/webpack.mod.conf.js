const webpack = require('webpack')
const config = require('./config')
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production';
const {
  resolve
} = require('./utils')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const generateModConfig = mod => {
  const allEntries = {
    'ModuleA': resolve(`src/routes/App/children/ModuleA/index.js`),
    'ModuleB': resolve(`src/routes/App/children/ModuleB/index.js`)
  }

  const webpackConfig = {
    mode: 'production',
    entry: mod === 'all' ? allEntries : { [mod] : allEntries[mod] },
    output: {
      path: resolve(`build/modules/`),
      chunkFilename: '[name].[contentHash:5].chunk.js',
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
        '@': resolve('src')
      }
    },
    optimization: {
      minimizer: [
      ]

    },
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
    optimization: {
      splitChunks: {
        chunks: 'initial',
        minSize: 2000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }

  }
  return webpackConfig
}

module.exports = generateModConfig
