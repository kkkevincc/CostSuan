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

    // Base path for GitHub Pages (change to your repo name)
    // basePath: '/Gemini-Cost',

    reactStrictMode: true,
};

module.exports = nextConfig;
