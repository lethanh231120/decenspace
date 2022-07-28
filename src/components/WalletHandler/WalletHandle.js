import React, { useState } from 'react'
import { ethers } from 'ethers'
import { Button } from 'antd'
import './styles.scss'

const WalletHandle = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [gasPrice, setGasPrice] = useState()
  //   const [sign, setSign] = useState()
  const [connButtonText, setConnButtonText] = useState('Connect Wallet')
  const ETHER = window.ethereum

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
    getGasPrice(newAccount.toString())
    getAccounts(newAccount.toString())
    // getSign(newAccount.toString())
    sendTransactions(newAccount.toString())
    getTransactionCount(newAccount.toString())
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

  const getGasPrice = () => {
    window.ethereum.request({ method: 'eth_gasPrice', params: [] })
      .then(res => {
        setGasPrice(res)
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }

  const getAccounts = () => {
    ETHER.request({ method: 'eth_accounts', params: [] })
      .then(res => {
        console.log('RES', res)
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }

  //   const getSign = (account) => {
  //     ETHER.request({ method: 'eth_sign', params: [account, '0xdeadbeaf'] })
  //       .then(res => {
  //         console.log('SET SIGN SUCCESS ')
  //         setSign(res)
  //       })
  //       .catch(err => {
  //         setErrorMessage(err.message)
  //       })
  //   }

  const chainChangedHandler = () => {
    window.location.reload()
  }

  const sendTransactions = async(account) => {
    const params = [{
      from: account,
      to: '0x24cd4a83a7A01f007be0C5f73274282Cb4b3acFB',
      //   gas: '0x76c0', // 30400
      //   gasPrice: gasPrice, // 10000000000000
      value: Number(100000000000000000).toString(16)
      // data: sign
    }]
    await ETHER.request({ method: 'eth_sendTransaction', params: params })
  }

  const getTransactionCount = (account) => {
    ETHER.request({ method: 'eth_getTransactionCount', params: [account, 'latest'] })
      .then(res =>{
        console.log('GET TRANS COUNT', parseInt(res, 16))
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
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
      <div className='gasPrice'>
        <h4>Gas Price: {gasPrice}</h4>
      </div>
      {errorMessage}
    </div>
  )
}

export default WalletHandle
