// import { createProxyMiddleware } from 'http-proxy-middleware'
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/addressService', {
      target: 'http://139.180.147.199:8082',
      changeOrigin: true,
      pathRewrite: {
        '^/addressService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
  app.use(
    createProxyMiddleware('/accountService', {
      target: 'http://139.180.147.199:8080',
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
      target: 'http://139.180.147.199:8081',
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
      target: 'http://139.180.147.199:8083',
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
      target: 'https://a220-118-70-117-216.ap.ngrok.io',
      changeOrigin: true,
      pathRewrite: {
        '^/evmService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
}
