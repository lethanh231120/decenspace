import { combineReducers } from '@reduxjs/toolkit'

import userInfo from './useInfo'
import profileSlice from './profileSlice'
import bitcoinSlice from './bitcoinSlice'
import coinsSlice from './coinsSlice'
import evmSlice from './evmSlice'

export default combineReducers({
  userInfo: userInfo,
  profile: profileSlice,
  connectionBtc: bitcoinSlice,
  coins: coinsSlice,
  connectionEvm: evmSlice
})
