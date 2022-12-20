const { defineConfig } = require('@vue/cli-service')
const path = require('path')
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
  configureWebpack: {
        resolve: {
          symlinks: false,
          alias: {
            vue: path.resolve('./node_modules/vue')
          }
        }
      }
})


// const path = require('path')

// module.exports = {
//   configureWebpack: {
//     resolve: {
//       symlinks: false,
//       alias: {
//         vue: path.resolve('./node_modules/vue')
//       }
//     }
//   }
// }