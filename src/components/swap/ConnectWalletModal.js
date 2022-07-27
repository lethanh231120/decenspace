import React from 'react'
import { RightOutlined } from '@ant-design/icons'
import './styles.scss'

export const ConnectWalletModal = ({ setIsConnectWalletModal }) => {
  return (
    <div className='connect-wallet__modal'>
      <div className='connect-wallet__modal-header'>
        <div className='connect-wallet__modal-header-title'>Select Portfolio to Connect</div>
        <div className='connect-wallet__modal-header-description'>Connect your wallets and exchanges to manage all your assets together now.</div>
      </div>
      <div className='connect-wallet__modal-wallet'>
        <div className='connect-wallet__modal-wallet-coinstats'>
          <img src='https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/60/68/f4/6068f415-3c6f-3a46-1123-5bc4b9558180/source/512x512bb.png' alt='coinstats-logo' />
          <div>CoinStats Wallet <RightOutlined /></div>
        </div>

        <div className='connect-wallet__modal-wallet-coinstats'>
          <img src='https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/60/68/f4/6068f415-3c6f-3a46-1123-5bc4b9558180/source/512x512bb.png' alt='coinstats-logo' />
          <div>CoinStats Wallet <RightOutlined /></div>
        </div>

        <div className='connect-wallet__modal-wallet-coinstats'>
          <img src='https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/60/68/f4/6068f415-3c6f-3a46-1123-5bc4b9558180/source/512x512bb.png' alt='coinstats-logo' />
          <div>CoinStats Wallet <RightOutlined /></div>
        </div>

        <div className='connect-wallet__modal-wallet-coinstats'>
          <img src='https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/60/68/f4/6068f415-3c6f-3a46-1123-5bc4b9558180/source/512x512bb.png' alt='coinstats-logo' />
          <div>CoinStats Wallet <RightOutlined /></div>
        </div>

      </div>
    </div>
  )
}
