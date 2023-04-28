const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    "port": 80,
    proxy: {
      // '/api/': {
      //   target: 'https://nerd.cesnet.cz/nerd/api/v1',
      //   pathRewrite: { '^/api': '' },
      //   changeOrigin: true,
      // },
      '/nerd/api/v2/': {
        target: 'http://localhost:8000/',
        pathRewrite: { '^/api/v2': '/nerd/api/v2' },
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
      },
      publicPath: '/nerd2/',

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