import { Binance } from '../../components/platforms/Binance'
import { Bitcoin } from '../../components/platforms/Bitcoin'
import { Coinbase } from '../../components/platforms/Coinbase'
import { Metamask } from '../../components/platforms/Metamask'
import { BinanceSmartChain } from '../../components/platforms/BinanceSmartChain'
import { EthereumWallet } from '../../components/platforms/EthereumWallet'
import { Solana } from '../../components/platforms/Solana'
export const platforms = [
  {
    id: 'bitcoin',
    icon: '/coins/bitcoin.png',
    platform: <Bitcoin/>,
    name: 'Bitcoin'
  },
  {
    id: 'binance',
    icon: '/coins/binance.png',
    platform: <Binance/>,
    name: 'Binance'
  },
  {
    id: 'coinbase',
    icon: '/coins/coinbase.png',
    platform: <Coinbase/>,
    name: 'Coinbase'
  },
  {
    id: 'metamask',
    icon: '/coins/metamask.png',
    platform: <Metamask/>,
    name: 'Metamask'
  },
  {
    chainId: 56,
    id: 'binance-mart-hain',
    icon: '/coins/binance_smart_chain.png',
    platform: <BinanceSmartChain/>,
    name: 'Binance Smart Chain'
  },
  {
    chainId: 1,
    id: 'ethereum-wallet',
    icon: '/coins/ethereum_wallet.png',
    platform: <EthereumWallet/>,
    name: 'Ethereum Wallet'
  },
  {
    chainId: 1399811149,
    id: 'solana-wallet',
    icon: '/coins/solana_wallet.png',
    platform: <Solana/>,
    name: 'Solana Wallet'
  }
]
