/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      '*': ['**/@swc/core*', '**/node_modules/@img/**'],
    },
  },
}

export default nextConfig
