const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@utils': path.resolve(__dirname, 'src/app/api'),
      '@pages': path.resolve(__dirname, 'src/app/pages'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@types': path.resolve(__dirname, 'src/app/types'),
      '@assets': path.resolve(__dirname, 'src/app/assets')
    }
  }
}