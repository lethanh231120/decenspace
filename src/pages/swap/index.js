import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import './styles.scss'
import { RightOutlined, DownOutlined } from '@ant-design/icons'
import AdvanceModal from '../../components/swap/AdvanceModal'
import { ConnectWalletModal } from '../../components/swap/ConnectWalletModal'

const Swap = () => {
  const [connect, setConnect] = useState(false)
  const [isModalAdvanced, setIsModalAdvanced] = useState(false)
  const [isConnectWalletModal, setIsConnectWalletModal] = useState(false)

  const onClick = () => {
    setIsConnectWalletModal(true)
    setConnect(false)
  }

  return (
    <div className='swap-page__container'>
      <div className='swap-page__modal'>
        <div className='swap-page__modal--title'>
          <span>Swap</span>
        </div>
        <>
          {connect
            ? (<div className='swap-page__modal--wallet-info'>
              <div className='swap-page__modal--wallet-info--left'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png'
                  alt='Coin logo' />
                <div className='swap-page__modal--wallet-info--left-no-img'>
                  <div className='swap-page__modal--wallet-info--name'>Ethereum Wallet</div>
                  <div className='swap-page__modal--wallet-info-props'>
                    <span className='swap-page__modal--wallet-info-props--address'>0xd6...d41f</span>
                    <span className='swap-page__modal--wallet-info-props--status'>Connected</span>
                  </div>
                </div>
              </div>
              <div className='change-wallet--arrow'>
                <RightOutlined />
              </div>
            </div>)
            : (<div className='swap-page__modal--connect-wallet'>
              <div className='connect-wallet-span'>Connect Your Wallet</div>
              <Button onClick={onClick}>Connect</Button>
            </div>)
          }
        </>
        <div className='swap-page__modal--swap'>
          <div className='swap-page__modal--swap-from'>
            <div className='select-coin-part'>
              <div className='swap-span'>From</div>
              <Button className='swap-coin-btn'>
                Select coin <DownOutlined />
              </Button>
            </div>
            <div className='quantity-part'>
              <div className='coin-amount'>0</div>
              <div className='coin-price'>$0</div>
            </div>
          </div>
          <div className='swap-page__modal--swap-to'>
            <div className='select-coin-part'>
              <div className='swap-span'>To</div>
              <Button className='swap-coin-btn'>
                Select coin <DownOutlined />
              </Button>
            </div>
            <div className='quantity-part'>
              <div className='coin-amount'>0</div>
              <div className='coin-price'>$0</div>
            </div>
          </div>
        </div>
        <div className='swap-page__modal--amount-progress'>
          <div className='progress-bar'>
            {/* <Progress
              id='progressBar'
              strokeColor={{ from: '#108ee9', to: '#87d068' }}
              percent={percent}
              status='active'
            />
            <span className='progress-number' onClick={setPercent(0)}>0%</span> */}
          </div>
        </div>
        <div className='swap-page__modal--advanced-btn'>
          <Button onClick={() => setIsModalAdvanced(true)}>Advanced <DownOutlined /></Button>
        </div>
        <div className='swap-page__modal--submit-btn'>
          <Button disabled>Submit swap</Button>
        </div>
        <div className='swap-page__modal--footer'>
          <h6>Swap by the best price from all sources</h6>
          <h6>The quote includes 0.5% <a>CoinStats Defi Swap fee</a></h6>
        </div>
      </div>
      <Modal
        className='advanced-modal'
        visible={isModalAdvanced}
        onOk={() => setIsModalAdvanced(false)}
        onCancel={() => setIsModalAdvanced(false)}
        footer={null}
      >
        <AdvanceModal setIsModalAdvanced={setIsModalAdvanced} />
      </Modal>

      <Modal
        className='connect-wallet-modal'
        visible={isConnectWalletModal}
        onOk={() => setIsConnectWalletModal(false)}
        onCancel={() => setIsConnectWalletModal(false)}
        footer={null}
      >
        <ConnectWalletModal setIsConnectWalletModal={setIsConnectWalletModal} />
      </Modal>
    </div >
  )
}
export default Swap
