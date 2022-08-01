import React from 'react'
import Header from './header'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home'
import PortfolioPage from '../pages/portfolio'
import SwapPage from '../pages/swap'
import Cryptocurrencies from '../pages/cryptocurrencies'
import PricingPage from '../pages/price'
import ProfilePage from '../pages/profile'
import EditProfilePage from '../pages/profile/edit-profile'
import PageNotFound from '../pages/404'
import ConnectWalletPage from '../pages/connect-wallet'
import ConnectPortfolioPage from '../pages/connect-portfolio'
import ConnectMetaMask from '../pages/connect-metamask'
import ResetPassword from '../components/auth/reset-password'
import DetailNFT from '../components/nft-evm/DetailNFT'
import { ConfirmEmail } from '../components/auth/confirm-email'
import { CoinDetail } from '../components/coins/CoinDetail'
import { Layout } from 'antd'
import './header/index.scss'
const { Content } = Layout
const Router = () => {
  return (
    <>
      <Header/>
      <Content style={{ margin: '0 6%' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='portfolio'>
            <Route path='' element={<PortfolioPage />} />
          </Route>
          <Route path='nft/:nftId' element={<DetailNFT />} />
          <Route path='coins/:coinId' element={<CoinDetail />} />
          <Route path='swap' element={<SwapPage />} />
          <Route path='cryptocurrencies' element={<Cryptocurrencies />} />
          <Route path='price' element={<PricingPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='edit-profile' element={<EditProfilePage />} />
          <Route path='forgot-password' element={<ResetPassword />} />
          <Route path='confirm-email' element={<ConfirmEmail />} />
          <Route path='connect-metamask' element={<ConnectMetaMask/>} />
          <Route path='connect-wallet' element={<ConnectWalletPage />} />
          <Route path='connect/:platformId' element={<ConnectWalletPage />} />
          <Route path='connect-portfolio' element={<ConnectPortfolioPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Content>
    </>
  )
}

export default Router
