/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 只在 GitHub Actions 环境使用 basePath
  ...(process.env.GITHUB_ACTIONS && { basePath: '/CostSuan' }),
  images: {
    unoptimized: true
  },
  // 禁用静态导出时不支持的功能
  trailingSlash: true,
}
module.exports = nextConfig
