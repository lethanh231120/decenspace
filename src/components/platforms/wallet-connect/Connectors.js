import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
// import Web3Modal from 'web3modal'
// metamask
export const injected = new InjectedConnector({
  // supportedChainIds: [1, 3, 4, 5, 42]
  // rpc: {
  //   1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
  // },
  infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
  bridge: 'https://uniswap.bridge.walletconnect.org',
  qrcode: true
  // rpc: {
  //   3: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
  // }
})
// wallet connect
export const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})
// coin base
export const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: 'web3-react-demo'
})
// trust wallet
export const connector = new WalletConnect({
  bridge: 'https://bridge.walletconnect.org',
  qrcodeModal: QRCodeModal
})
