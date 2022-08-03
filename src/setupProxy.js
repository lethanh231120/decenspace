const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/bitcoinService', {
      target: 'https://bitcoin.nika.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/bitcoinService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
  app.use(
    createProxyMiddleware('/accountService', {
      target: 'https://accounts.nika.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/accountService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
  app.use(
    createProxyMiddleware('/coinPriceService', {
      target: 'https://coinsprices.nika.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/coinPriceService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
  app.use(
    createProxyMiddleware('/mailService', {
      target: 'https://mail.nika.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/mailService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
  app.use(
    createProxyMiddleware('/evmService', {
      target: 'https://evm.nika.guru',
      changeOrigin: true,
      pathRewrite: {
        '^/evmService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
  app.use(
    createProxyMiddleware('/nftService', {
      target: 'https://nft.nika.guru/',
      changeOrigin: true,
      pathRewrite: {
        '^/nftService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
}
