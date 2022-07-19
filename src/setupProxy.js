// import { createProxyMiddleware } from 'http-proxy-middleware'
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/addressService', {
<<<<<<< HEAD
      target: 'http://139.180.147.199:8082',
=======
      target: 'http://139.180.147.199:8081',
>>>>>>> 07c61fd (fix netlify)
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
<<<<<<< HEAD
      target: 'http://139.180.147.199:8080',
=======
      target: 'http://139.180.147.199:8100',
>>>>>>> 07c61fd (fix netlify)
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
<<<<<<< HEAD
      target: 'http://139.180.147.199:8081',
=======
      target: 'http://139.180.147.199:8000',
>>>>>>> 07c61fd (fix netlify)
      changeOrigin: true,
      pathRewrite: {
        '^/coinPriceService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
}
