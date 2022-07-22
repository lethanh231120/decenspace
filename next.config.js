module.exports = {
  experimental: {
    async redirects() {
      return [
        {
          source: '/accountService/:path*',
          destination: `http://139.180.147.199:8080/:path*`,
          permanent: false
        },
        {
          source: '/coinPriceService/:path*',
          destination: `http://139.180.147.199:8081/:path*`,
          permanent: false
        },
        {
          source: '/addressService/:path*',
          destination: `http://139.180.147.199:8082/:path*`,
          permanent: false
        },
        {
          source: '/mailService/:path*',
          destination: `http://139.180.147.199:8083/:path*`,
          permanent: false
        },
        {
          source: '/evmService/:path*',
          destination: `https://a220-118-70-117-216.ap.ngrok.io/:path*`,
          permanent: false
        }
      ]
    }
  }
}
