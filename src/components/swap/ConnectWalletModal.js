import React, { useState } from 'react'
import { RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import ModalHeader from '../modal/connect-portfolio/ModalHeader'
import ModalContent from '../modal/connect-portfolio/ModalContent'
// import { ethers } from 'ethers'
// import { useQuery } from '@tanstack/react-query'
// import { get } from '../../api/bitcoinService'
// import { getEvm } from '../../api/evmService'
import { Modal } from 'antd'
import './styles.scss'

export const ConnectWalletModal = ({ setIsConnectWalletModal, setAddress, setChainId }) => {
  // const [isAddress, setIsAddress] = useState(false)
  // const [errorMessage, setErrorMessage] = useState(null)
  // const [defaultAccount, setDefaultAccount] = useState(null)
  const [isPlatformModal, setIsPlatformModal] = useState(false)
  const navigate = useNavigate()
  const handleConnectBitcoinWallet = () => {
    navigate('/connect/bitcoin')
  }

  const chainChangedHandler = () => {
    window.ethereum.request({ method: 'eth_chainId' })
      .then(result =>{
        setChainId(parseInt(result, 16))
      })
      .catch(err =>{
        console.log(err)
      // setErrorMessage(err.message)
      })
  }

  window.ethereum.on('chainChanged', chainChangedHandler)

  const handleConnectEthereumWallet = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log(' Meta Mask HERE')

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          sessionStorage.setItem('address', result[0])
          setAddress(result[0])
          setIsConnectWalletModal(false)
        })
        .catch(err =>{
          console.log(err)
          // setErrorMessage(err.message)
        })
    } else {
      console.log(' Pls install MetaMask')
      // setErrorMessage(' Install MetaMask to connect with your wallet')
    }
  }

  const handleConnectTrustWallet = () => {
    navigate('/connect/trust-wallet')
  }

  const openPlatformModal = () => {
    setIsConnectWalletModal(false)
    setIsPlatformModal(true)
  }

  // const { data: holding_btc } = useQuery(
  //   ['holding_btc'],
  //   async() => {
  //     const dataBtc = await get('bitcoin/holdings')
  //     return dataBtc?.data
  //   }
  // )

  // const { data: holding_evm } = useQuery(
  //   ['holding_evm'],
  //   async() => {
  //     const dataEvm = await getEvm('evm/holdings')
  //     return dataEvm?.data
  //   }
  // )
  // console.log('BTCCCC', holding_btc)
  // console.log('EVM', holding_evm)

  // useEffect(() => {
  //   if (holding_btc !== undefined || holding_evm !== undefined) {
  //     setIsAddress(true)
  //   }
  // }, [holding_evm, holding_btc])

  return (
    // isAddress ? (
    //   <div>Wait me to load address</div>
    // ) : (
    <div className='connect-wallet__modal'>
      <div className='connect-wallet__modal-header'>
        <div className='connect-wallet__modal-header-title'>Select Portfolio to Connect</div>
        <div className='connect-wallet__modal-header-description'>Connect your wallets and exchanges to manage all your assets together now.</div>
      </div>
      <div className='connect-wallet__modal-wallet'>
        <div className='connect-wallet__modal-wallet-zone' onClick={handleConnectBitcoinWallet}>
          <img src='https://cdn.pixabay.com/photo/2015/08/27/11/20/bitcoin-910307_1280.png' alt='coinstats-logo' />
          <div>Bitcoin Wallet <RightOutlined /></div>
        </div>

        <div className='connect-wallet__modal-wallet-zone' onClick={handleConnectEthereumWallet}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png' alt='eth-logo' />
          <div>&nbsp;&nbsp;Ethereum Wallet <RightOutlined /></div>
        </div>

        <div className='connect-wallet__modal-wallet-zone' onClick={handleConnectTrustWallet}>
          <img src='https://trustwallet.com/assets/images/media/assets/TWT.png' alt='trust-wallet' />
          <div>Trust Wallet <RightOutlined /></div>
        </div>

        <div className='connect-wallet__modal-wallet-zone' onClick={openPlatformModal}>
          <img src='https://www.iconpacks.net/icons/2/free-coin-wallet-icon-2204-thumb.png' alt='coinstats-logo' />
          <div>Connect to other <RightOutlined /></div>
        </div>
      </div>

      <Modal
        visible={isPlatformModal}
        footer={null}
        onOk={() => setIsPlatformModal(false)}
        onCancel={() => setIsPlatformModal(false)}
        className='platform-modal'
      >
        <ModalHeader />
        <ModalContent
        // isPlatformModal={isPlatformModal}
        // setIsPlatformModal={setIsPlatformModal}
        />
      </Modal>
    </div>
  )
}
