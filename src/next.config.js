module.exports = {
  experimental: {
    async redirects() {
      return [{
        source: '/addressService/:path*',
        destination: `http://139.180.147.199:8082/:path*`,
        permanent: false
      }]
    }
  }
}
