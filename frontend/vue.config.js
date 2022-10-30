const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://nerd.cesnet.cz/nerd/api/v1',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
})
