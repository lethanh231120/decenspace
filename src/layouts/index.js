import React from 'react'
import Blogs from '../pages/blog'
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
          <Route path='portfolio' element={<PortfolioPage />} />
          <Route path='swap' element={<SwapPage />} />
          <Route path='cryptocurrencies' element={<Cryptocurrencies />} />
          <Route path='price' element={<PricingPage />} />
          <Route path='blog' element={<Blogs />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='edit-profile' element={<EditProfilePage />} />
          <Route path='accounts/forgot-password/uuid/:uuid' element={<ResetPassword />} />
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
