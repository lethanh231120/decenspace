import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './store'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'antd/dist/antd.min.css'

const queryClient = new QueryClient()
const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000
  return library
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <BrowserRouter>
            {/* <ReactQueryDevtools initialIsOpen /> */}
            <App />
          </BrowserRouter>
        </Web3ReactProvider>
      </QueryClientProvider>
    </Provider>
  </>
)

