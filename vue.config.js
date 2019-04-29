module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },
  transpileDependencies: [
    /[\\/]node_modules[\\/]quasar[\\/]/
  ],
  devServer: {
    port: 8080, // 端口号..
    host: "localhost",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
        "/api": {
            target: "http://192.168.3.179:8090",
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        },
        "/foo": {
            target: "<other_url>"
        }
    } // 配置多个代理
  }
}
