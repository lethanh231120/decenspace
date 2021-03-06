import { combineReducers } from '@reduxjs/toolkit'

import userInfo from './useInfo'
import profileSlice from './profileSlice'
import bitcoinSlice from './bitcoinSlice'
import coinsPriceSlice from './coinsPriceSlice'
import evmSlice from './evmSlice'
import nftSlice from './nftSlice'

export default combineReducers({
  userInfo: userInfo,
  profile: profileSlice,
  connectionBtc: bitcoinSlice,
  coinPrice: coinsPriceSlice,
  connectionEvm: evmSlice,
  connectionNft: nftSlice
})
