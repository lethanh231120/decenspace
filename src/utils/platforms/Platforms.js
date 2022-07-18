import { Binance } from '../../components/platforms/Binance'
import { Bitcoin } from '../../components/platforms/Bitcoin'
import { Coinbase } from '../../components/platforms/Coinbase'
import { Metamask } from '../../components/platforms/Metamask'
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
  }
]
