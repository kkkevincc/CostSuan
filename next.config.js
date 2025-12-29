/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/CostSuan' : '',
  images: {
    unoptimized: true
  },
  // 禁用静态导出时不支持的功能
  trailingSlash: true,
}
module.exports = nextConfig
