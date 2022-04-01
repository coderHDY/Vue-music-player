module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "network": "@/network",
        "views": "@/views",
        "store": "@/store"
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.107.12.241:8088/',
        changeOrigin: true, // 跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      importWorkboxFrom: 'local',
      importsDirectory: 'js',
      navigateFallback: '/',
      navigateFallbackBlacklist: [/\/api\//],
    }
  }
}
