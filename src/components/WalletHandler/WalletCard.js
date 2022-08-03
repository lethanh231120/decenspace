import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import useSWR from 'swr'
import { ethers } from 'ethers'
import { Button } from 'antd'
import './styles.scss'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42 // Kovan
  ]
})

const chainChangedHandler = () =>{
  window.location.reload()
}

window.ethereum.on('chainChanged', chainChangedHandler)

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React()
  const onClick = () => {
    activate(injectedConnector)
  }

  return (
    <div>
      { active ? (
        <>
          <div> Wallet Connected</div>
          <div> ChainId : {chainId} </div>
          <div> Account: {account} </div>
        </>
      ) : (
        <Button onClick={onClick}>
          Connect
        </Button>
      )}
    </div>
  )
}

const fetcher = (library) => (...args) => {
  const [method, ...params] = args
  console.log(method, params)
  return library[method](...params)
}

export const Balance = () => {
  const { account, library } = useWeb3React()
  const { data: balance } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library)
  })

  // useEffect(() => {
  //   // listen for changes on an Ethereum address
  //   console.log(`listening for blocks...`)
  //   library.on('block', () => {
  //     console.log('update balance...')
  //     mutate(undefined, true)
  //   })

  //   // remove listener when the component is unmounted
  //   return () => {
  //     library.removeAllListeners('block')
  //   }
  // }, [])

  if (!balance) {
    return <div> Pls connect wallet to get balance </div>
  }
  return <div> Balance: {ethers.utils.formatEther(balance)} </div>
}

// export const TokenBalance = ({ symbol, address, decimals }) => {
//   const { account, library } = useWeb3React()
//   const { data: balance, mutate } = useSWR([address, 'balanceOf', account], {
//     fetcher: fetcher(library, ERC20ABI)
//   })

//   useEffect(() => {
//     // listen for changes on an Ethereum address
//     console.log(`listening for Transfer...`)
//     const contract = new Contract(address, ERC20ABI, library.getSigner())
//     const fromMe = contract.filters.Transfer(account, null)
//     library.on(fromMe, (from, to, amount, event) => {
//       console.log('Transfer|sent', { from, to, amount, event })
//       mutate(undefined, true)
//     })
//     const toMe = contract.filters.Transfer(null, account)
//     library.on(toMe, (from, to, amount, event) => {
//       console.log('Transfer|received', { from, to, amount, event })
//       mutate(undefined, true)
//     })
//     // remove listener when the component is unmounted
//     return () => {
//       library.removeAllListeners(toMe)
//       library.removeAllListeners(fromMe)
//     }
//   }, [])

//   if (!balance) {
//     return <div>...</div>
//   }
//   return (
//     <div>
//       {ethers.utils.formatEther(balance, decimals)} {symbol}
//     </div>
//   )
// }
