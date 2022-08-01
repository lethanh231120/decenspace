import { Binance } from '../../components/platforms/Binance'
import { Bitcoin } from '../../components/platforms/Bitcoin'
import Coinbase from '../../components/platforms/Coinbase'
import { Metamask } from '../../components/platforms/Metamask'
import { BinanceSmartChain } from '../../components/platforms/BinanceSmartChain'
import { EthereumWallet } from '../../components/platforms/EthereumWallet'
import { Solana } from '../../components/platforms/Solana'
import { TrustWallet } from '../../components/platforms/TrustWallet'
export const platforms = [
  {
    id: 'binance',
    icon: '/coins/binance.png',
    platform: <Binance/>,
    name: 'Binance'
  },
  {
    id: 'metamask',
    icon: '/coins/metamask.png',
    platform: <Metamask/>,
    name: 'Metamask'
  },
  {
    id: 'coinbase',
    icon: '/coins/coinbase.png',
    platform: <Coinbase/>,
    name: 'Coinbase'
  },
  {
    chainId: 1,
    id: 'ethereum-wallet',
    icon: '/coins/ethereum_wallet.png',
    platform: <EthereumWallet/>,
    name: 'Ethereum Wallet'
  },
  {
    id: 'bitcoin',
    icon: '/coins/bitcoin.png',
    platform: <Bitcoin/>,
    name: 'Bitcoin'
  },
  {
    chainId: 56,
    id: 'binance-mart-chain',
    icon: '/coins/binance_smart_chain.png',
    platform: <BinanceSmartChain/>,
    name: 'Binance Smart Chain'
  },
  {
    chainId: 1399811149,
    id: 'solana-wallet',
    icon: '/coins/solana_wallet.png',
    platform: <Solana/>,
    name: 'Solana Wallet'
  },
  {
    chainId: 1399811149,
    id: 'trust-wallet',
    icon: '/coins/trust_wallet.png',
    platform: <TrustWallet/>,
    name: 'Trust Wallet'
  }
]
