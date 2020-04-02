module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  }
}