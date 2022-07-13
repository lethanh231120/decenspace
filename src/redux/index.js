import { combineReducers } from '@reduxjs/toolkit'

import blogSlice from './blogSlice'
import userInfo from './useInfo'
import profileSlice from './profileSlice'
import addressSlice from './addressSlice'

export default combineReducers({
  blogs: blogSlice,
  userInfo: userInfo,
  profile: profileSlice,
  address: addressSlice
})
