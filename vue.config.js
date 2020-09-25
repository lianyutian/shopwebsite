const resolve = dir => require('path').join(__dirname, dir)
module.exports = {
  lintOnSave: false,
  resolve: {
    alias: {
      '@': resolve('src'), // 配置src目录的别名
      '_c': resolve('src/components') // 配置公共组件目录的别名
    }
  }
}
