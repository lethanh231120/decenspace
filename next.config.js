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
          permanent: false,
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
            { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' }
          ]
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
