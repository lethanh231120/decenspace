// import { createProxyMiddleware } from 'http-proxy-middleware'
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/addressService', {
<<<<<<< HEAD
<<<<<<< HEAD
      target: 'http://139.180.147.199:8082',
=======
      target: 'http://139.180.147.199:8081',
>>>>>>> 07c61fd (fix netlify)
=======
      target: 'http://139.180.147.199:8082',
>>>>>>> c932856 (validate edit profile)
      changeOrigin: true,
      pathRewrite: {
        '^/addressService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
<<<<<<< HEAD
<<<<<<< HEAD

  app.use(
    createProxyMiddleware('/accountService', {
      target: 'http://139.180.147.199:8080',
=======
  app.use(
    createProxyMiddleware('/accountService', {
      target: 'http://139.180.147.199:8100',
>>>>>>> 07c61fd (fix netlify)
=======

  app.use(
    createProxyMiddleware('/accountService', {
      target: 'http://139.180.147.199:8080',
>>>>>>> c932856 (validate edit profile)
      changeOrigin: true,
      pathRewrite: {
        '^/accountService': ''
      },
      headers: {
        Connection: 'keep-alive'
      }
    })
  )
<<<<<<< HEAD
<<<<<<< HEAD

  app.use(
    createProxyMiddleware('/coinPriceService', {
      target: 'http://139.180.147.199:8081',
=======
  app.use(
    createProxyMiddleware('/coinPriceService', {
      target: 'http://139.180.147.199:8000',
>>>>>>> 07c61fd (fix netlify)
=======

  app.use(
    createProxyMiddleware('/coinPriceService', {
      target: 'http://139.180.147.199:8081',
>>>>>>> c932856 (validate edit profile)
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
