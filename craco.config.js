const CracoAntDesignPlugin = require('craco-antd');

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          // '@primary-color': '#1DA57A',
        },
      },
    },
  ],
  devServer:{
    proxy: {
      "/api": {
          target: 'http://localhost:1313',
          changeOrigin: true,
          pathRewrite: {
              "^/api": "/api"
          }
      },
      "/file": {
          target: 'http://localhost:1313',
          changeOrigin: true,
          pathRewrite: {
              "^/file": "/file"
          }
      },
    } 
  }
};