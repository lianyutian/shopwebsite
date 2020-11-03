const path = require('path')
module.exports = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 配置src目录的别名
        '_c': path.resolve(__dirname, 'src/components') // 配置公共组件目录的别名
      }
    }
  }