import { combineReducers } from '@reduxjs/toolkit'

import blogSlice from './blogSlice'
import userInfo from './useInfo'
import profileSlice from './profileSlice'
export default combineReducers({
  blogs: blogSlice,
  userInfo: userInfo,
  profile: profileSlice
})
