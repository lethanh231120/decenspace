import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, del, patch } from '../api/bitcoinService'
import {
  LOADING_IMPORT_CONNECTION,
  SUCCESS_IMPORT_CONNECTION,
  FAILED_IMPORT_CONNECTION,
  // LOADING_GET_ALL_CONNECTION,
  // SUCCESS_GET_ALL_CONNECTION,
  // // FAILED_GET_ALL_CONNECTION,
  // LOADING_GET_ALL_HOLDING_BTC,
  // SUCCESS_GET_ALL_HOLDING_BTC,
  // FAILED_GET_ALL_HOLDING_BTC,
  LOADING_DELETE_CONNECTION,
  SUCCESS_DELETE_CONNECTION,
  FAILED_DELETE_CONNECTION,
  LOADING_UPDATE_CONNECTION,
  SUCCESS_UPDATE_CONNECTION,
  FAILED_UPDATE_CONNECTION
} from '../constants/StatusMessageConstants'

import { getCookie, STORAGEKEY } from '../utils/storage'

const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}
export const importConnectionBtc = createAsyncThunk(
  'connections/importConnectionBtc',
  async(data) => {
    return await post('bitcoin/import-address', data, config)
  }
)

// export const getAllConnectionBtc = createAsyncThunk(
//   'connections/getAllConnectionBtc',
//   async() => {
//     return await get('bitcoin/connection/current-connections')
//   }
// )

// export const getAllHoldingBtc = createAsyncThunk(
//   'connections/getAllHoldingBtc',
//   async() => {
//     return await get('bitcoin/holdings')
//   }
// )

export const deleteConnectionBtc = createAsyncThunk(
  'connections/deleteConnectionBtc',
  async(id) => {
    return await del(`bitcoin/connection/connectionId=${id}`)
  }
)

export const updateConnectionBtc = createAsyncThunk(
  'connections/updateConnectionBtc',
  async(info) => {
    const { id, data } = info
    return await patch(`bitcoin/connection/connectionId=${id}`, data)
  }
)

const bicoinSlice = createSlice({
  name: 'import Connection',
  initialState: {
    data_btc: null,
    status_btc: null,
    list_connection_btc: null,
    holding_btc: []
  },
  extraReducers: {
    // post connection wallet bitcoins
    [importConnectionBtc.pending]: (state, action) => {
      state.status_btc = LOADING_IMPORT_CONNECTION
    },
    [importConnectionBtc.fulfilled]: (state, action) => {
      state.data_btc = action.payload
      state.status_btc = SUCCESS_IMPORT_CONNECTION
      state.list_connection_btc = null
    },
    [importConnectionBtc.rejected]: (state, action) => {
      state.status_btc = FAILED_IMPORT_CONNECTION
    },

    // get all connection wallet bitcoins
    // [getAllConnectionBtc.pending]: (state, action) => {
    //   state.status_btc = LOADING_GET_ALL_CONNECTION
    // },
    // [getAllConnectionBtc.fulfilled]: (state, action) => {
    //   state.data_btc = null
    //   state.status_btc = SUCCESS_GET_ALL_CONNECTION
    //   state.list_connection_btc = action.payload.data
    // },
    // [getAllConnectionBtc.rejected]: (state, action) => {
    //   state.status_btc = FAILED_GET_ALL_CONNECTION
    // },

    // get all holding evm
    // [getAllHoldingBtc.pending]: (state, action) => {
    //   state.status_btc = LOADING_GET_ALL_HOLDING_BTC
    // },
    // [getAllHoldingBtc.fulfilled]: (state, action) => {
    //   state.data_btc = null
    //   state.status_btc = SUCCESS_GET_ALL_HOLDING_BTC
    //   state.holding_btc = action.payload.data
    // },
    // [getAllHoldingBtc.rejected]: (state, action) => {
    //   state.status_btc = FAILED_GET_ALL_HOLDING_BTC
    // },

    // delete connection wallet bitcoins
    [deleteConnectionBtc.pending]: (state, action) => {
      state.status_btc = LOADING_DELETE_CONNECTION
    },
    [deleteConnectionBtc.fulfilled]: (state, action) => {
      state.data_btc = null
      state.status_btc = SUCCESS_DELETE_CONNECTION
      state.list_connection_btc = null
    },
    [deleteConnectionBtc.rejected]: (state, action) => {
      state.status_btc = FAILED_DELETE_CONNECTION
    },

    // update connection wallet bitcoins
    [updateConnectionBtc.pending]: (state, action) => {
      state.status_btc = LOADING_UPDATE_CONNECTION
    },
    [updateConnectionBtc.fulfilled]: (state, action) => {
      state.data_btc = null
      state.status_btc = SUCCESS_UPDATE_CONNECTION
      state.list_connection_btc = null
    },
    [updateConnectionBtc.rejected]: (state, action) => {
      state.status_btc = FAILED_UPDATE_CONNECTION
    }
  }
})

export default bicoinSlice.reducer
