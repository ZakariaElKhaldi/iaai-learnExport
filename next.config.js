/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Disable caching during development
    disableOptimizedLoading: true,
    optimizeCss: false,
  },
  // Force full page refreshes instead of React Fast Refresh
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Disable React Fast Refresh
      config.cache = false;
    }

    // Add Monaco Editor webpack configuration
    if (!isServer) {
      // Set global object for web workers
      config.output.globalObject = 'self';
      
      // Add Monaco Editor webpack plugin if you want to bundle languages
      const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
      config.plugins.push(
        new MonacoWebpackPlugin({
          // Available languages
          languages: [
            'javascript',
            'typescript',
            'html',
            'css',
            'json',
            'python',
            'java',
            'cpp',
            'csharp',
            'markdown',
            'yaml',
            'xml',
            'php',
            'ruby',
            'go',
            'rust',
            'sql',
            'shell',
          ],
          // Output filename for workers
          filename: 'static/[name].worker.js',
        })
      );
    }

    return config;
  },
}

export default nextConfig;
