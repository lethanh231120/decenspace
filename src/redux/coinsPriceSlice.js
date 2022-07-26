import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../api/coinPriceService'
import {
  LOADING_GET_COIN_PRICE,
  SUCCESS_GET_COIN_PRICE,
  FAILED_GET_COIN_PRICE
} from '../constants/StatusMessageConstants'

export const getPriceCoinByPeriod = createAsyncThunk(
  'coinPriceService/getPriceCoinByPeriod',
  async(params) => {
    const { coinId, time } = params
    return await get(`price/${coinId}/period?time=${time}`)
  }
)

const coinsPriceSlice = createSlice({
  name: 'get coin price',
  initialState: {
    data_coin_price: [],
    status: null
  },
  extraReducers: {
    // get coin price
    [getPriceCoinByPeriod.pending]: (state, action) => {
      state.status = LOADING_GET_COIN_PRICE
    },
    [getPriceCoinByPeriod.fulfilled]: (state, action) => {
      state.data_coin_price = action.payload.data
      state.status = SUCCESS_GET_COIN_PRICE
    },
    [getPriceCoinByPeriod.rejected]: (state, action) => {
      state.status = FAILED_GET_COIN_PRICE
    }
  }
})

export default coinsPriceSlice.reducer
