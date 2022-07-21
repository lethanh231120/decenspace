module.exports = {
  experimental: {
    async redirects() {
      return [
        {
          source: '/addressService/:path*',
          destination: `http://139.180.147.199:8082/:path*`,
          permanent: false
        },
        {
          source: '/accountService/:path*',
          destination: `https://e811-118-70-117-216.ap.ngrok.io/:path*`,
          // destination: `http://139.180.147.199:8080/:path*`,
          permanent: false
        },
        {
          source: '/coinPriceService/:path*',
          destination: `http://139.180.147.199:8081/:path*`,
          permanent: false
        }
      ]
    }
  }
}
