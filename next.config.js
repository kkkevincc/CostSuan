/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable static export for GitHub Pages
    output: 'export',

    // Disable image optimization for static export
    images: {
        unoptimized: true,
    },

    // Add trailing slash for GitHub Pages
    trailingSlash: true,

    // Base path for GitHub Pages (only in production)
    ...(process.env.NODE_ENV === 'production' && { basePath: '/CostSuan' }),

    reactStrictMode: true,
};

module.exports = nextConfig;
