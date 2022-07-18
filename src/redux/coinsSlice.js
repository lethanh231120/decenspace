import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDataDemo } from '../api/dataDemo'
import {
  LOADING_GET_LIST_COIN,
  SUCCESS_GET_LIST_COIN,
  FAILED_GET_LIST_COIN
} from '../constants/StatusMessageConstants'

export const getListCoin = createAsyncThunk(
  'cryptocurrencies/getListCoin',
  async(params) => {
    return await getDataDemo('coins', params)
  }
)

const coinsSlice = createSlice({
  name: 'get list coin',
  initialState: {
    data: null,
    status: null
  },
  extraReducers: {
    // get list coin screen cryptocurrencies
    [getListCoin.pending]: (state, action) => {
      state.status = LOADING_GET_LIST_COIN
    },
    [getListCoin.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = SUCCESS_GET_LIST_COIN
    },
    [getListCoin.rejected]: (state, action) => {
      state.status = FAILED_GET_LIST_COIN
    }
  }
})

export default coinsSlice.reducer
