import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, patch } from '../api/accountService'
import { getCookie, STORAGEKEY } from '../utils/storage'

const token = getCookie(STORAGEKEY.ACCESS_TOKEN)

const config = {
  headers: {
    'Authorization': `Bearer + ${token}`
  }
}

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async() => {
    return await get('accounts/profile/current-profile')
  }
)

export const updatePassword = createAsyncThunk(
  'password/updatePassword',
  async(data) => {
    return await patch('accounts/change-password', data, config)
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    status: null
  },
  extraReducers: {
    // get profile
    [getProfile.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getProfile.fulfilled]: (state, action) => {
      state.profile = action.payload
      state.status = 'success'
    },
    [getProfile.rejected]: (state, action) => {
      state.status = 'failed'
    },

    // change password
    [updatePassword.pending]: (state, action) => {
      state.status = 'loading'
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.status = 'change password successfully'
    },
    [updatePassword.rejected]: (state, action) => {
      state.status = 'change password fail'
    }
  }
})
export default profileSlice.reducer

