import React, { useState } from 'react'
import { ethers } from 'ethers'
import { Button } from 'antd'
import './styles.scss'

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [connButtonText, setConnButtonText] = useState('Connect Wallet')

  const connectWalletHandle = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log(' Meta Mask HERE')

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0])
          setConnButtonText('Wallet Connected')
          getAccountBalance(result[0])
        })
        .catch(err =>{
          setErrorMessage(err.message)
        })
    } else {
      console.log(' Pls install MetaMask')
      setErrorMessage(' Install MetaMask to connect with your wallet')
    }
  }

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount)
    getAccountBalance(newAccount.toString())
  }

  const getAccountBalance = (account) => {
    window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance))
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }

  const chainChangedHandler = () => {
    window.location.reload()
  }

  // listen for account changes
  window.ethereum.on('accountChanged', accountChangedHandler)
  window.ethereum.on('chainChanged', chainChangedHandler)

  return (
    <div className='wallet-card'>
      <Button onClick={connectWalletHandle}>{connButtonText}</Button>
      <h4>CONNECT TO METAMASK</h4>
      <div className='accountDisplay'>
        <h4>Address: {defaultAccount}</h4>
      </div>
      <div className='balanceDisplay'>
        <h4>Balance: {userBalance}</h4>
      </div>
      {errorMessage}
    </div>
  )
}

export default WalletCard
