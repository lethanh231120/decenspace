import { combineReducers } from '@reduxjs/toolkit'

import blogSlice from './blogSlice'
import userInfo from './useInfo'
import profileSlice from './profileSlice'
import addressSlice from './addressSlice'
import coinsSlice from './coinsSlice'

export default combineReducers({
  blogs: blogSlice,
  userInfo: userInfo,
  profile: profileSlice,
  connections: addressSlice,
  coins: coinsSlice
})
