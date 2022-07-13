import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, get } from '../api/BaseRequest'
import {
  LOADDING_IMPORT_ADDRESS,
  SUCCESS_IMPORT_ADDRESS,
  FAILED_IMPORT_ADDRESS,
  LOADING_GET_ALL_ADDRESS,
  SUCCESS_GET_ALL_ADDRESS,
  FAILED_GET_ALL_ADDRESS
} from '../constants/StatusMessageConstants'

export const importAddress = createAsyncThunk(
  'coins/importAddress',
  async(data) => {
    return await post('a44a-104-28-222-73.ap.ngrok.io/addresses/import-address', data)
  }
)

export const getAllAddress = createAsyncThunk(
  'coins/getAllAddress',
  async(data) => {
    return await get('a44a-104-28-222-73.ap.ngrok.io/addresses/connection/current-connections', data)
  }
)

const addressSlice = createSlice({
  name: 'import address',
  initialState: {
    data: null,
    status: null,
    list_address: null
  },
  extraReducers: {
    // post address wallet bitcoins
    [importAddress.pending]: (state, action) => {
      state.status = LOADDING_IMPORT_ADDRESS
    },
    [importAddress.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = SUCCESS_IMPORT_ADDRESS
      state.list_address = null
    },
    [importAddress.rejected]: (state, action) => {
      state.status = FAILED_IMPORT_ADDRESS
    },

    // post address wallet bitcoins
    [getAllAddress.pending]: (state, action) => {
      state.status = LOADING_GET_ALL_ADDRESS
    },
    [getAllAddress.fulfilled]: (state, action) => {
      state.data = null
      state.status = SUCCESS_GET_ALL_ADDRESS
      state.list_address = action.payload.data
    },
    [getAllAddress.rejected]: (state, action) => {
      state.status = FAILED_GET_ALL_ADDRESS
    }
  }
})

export default addressSlice.reducer
