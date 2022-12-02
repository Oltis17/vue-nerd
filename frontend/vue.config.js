const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8001,
    proxy: {
      '/api/': {
        target: 'https://nerd.cesnet.cz/nerd/api/v1',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
})


const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve('./node_modules/vue')
      }
    }
  }
}