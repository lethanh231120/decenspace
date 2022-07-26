module.exports = {
  experimental: {
    async redirects() {
      return [
        {
          source: '/accountService/:path*',
          destination: `https://accounts.nika.guru/:path*`,
          permanent: false
        },
        {
          source: '/coinPriceService/:path*',
          destination: `https://coinsprices.nika.guru/:path*`,
          permanent: false
        },
        {
          source: '/addressService/:path*',
          destination: `https://bitcoin.nika.guru/:path*`,
          permanent: false
        },
        {
          source: '/mailService/:path*',
          destination: `https://mail.nika.guru/:path*`,
          permanent: false
        },
        {
          source: '/evmService/:path*',
          destination: `https://evm.nika.guru/:path*`,
          permanent: false
        }
      ]
    }
  }
}
