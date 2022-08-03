import React from 'react'
import WalletHandle from '../../components/WalletHandler/WalletHandle'
// import { Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'
// import { Wallet, Balance } from '../../components/WalletHandler/WalletCard'

// function getLibrary(provider) {
//   const library = new Web3Provider(provider)
//   library.pollingInterval = 12000
//   return library
// }

const ConnectMetaMask = () => {
  return (
  // <Web3ReactProvider getLibrary={getLibrary}>
  // <Wallet />
  // <Balance />
  // </Web3ReactProvider>

    <div>
      <WalletHandle />
    </div>
  )
}

export default ConnectMetaMask
