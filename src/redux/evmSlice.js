import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, del } from '../api/evmService'
import {
  LOADING_IMPORT_CONNECTION_EVM,
  SUCCESS_IMPORT_CONNECTION_EVM,
  FAILED_IMPORT_CONNECTION_EVM,
  LOADING_DELETE_CONNECTION_EVM,
  SUCCESS_DELETE_CONNECTION_EVM,
  FAILED_DELETE_CONNECTION_EVM
//   LOADING_UPDATE_CONNECTION_EVM,
//   SUCCESS_UPDATE_CONNECTION_EVM,
//   FAILED_UPDATE_CONNECTION_EVM
} from '../constants/StatusMessageConstants'

import { getCookie, STORAGEKEY } from '../utils/storage'
const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}
export const importConnectionEvm = createAsyncThunk(
  'connections/importConnectionEvm',
  async(info) => {
    const { data, chainId } = info
    return await post(`evm/import-address?chainId=${chainId}`, data, config)
  }
)

export const deleteConnectionEvm = createAsyncThunk(
  'connections/deleteConnectionEvm',
  async(id) => {
    return await del(`evm/connection/connectionId=${id}`)
  }
)

const evmSlice = createSlice({
  name: 'import Connection EVM',
  initialState: {
    data_evm: null,
    status_evm: null,
    list_connection_evm: null,
    holding_evm: []
  },
  extraReducers: {
    // post connection evm
    [importConnectionEvm.pending]: (state, action) => {
      state.status_evm = LOADING_IMPORT_CONNECTION_EVM
    },
    [importConnectionEvm.fulfilled]: (state, action) => {
      state.data_evm = action.payload
      state.status_evm = SUCCESS_IMPORT_CONNECTION_EVM
      state.list_connection_evm = null
    },
    [importConnectionEvm.rejected]: (state, action) => {
      state.status_evm = FAILED_IMPORT_CONNECTION_EVM
    },

    // delete connection evm
    [deleteConnectionEvm.pending]: (state, action) => {
      state.status_evm = LOADING_DELETE_CONNECTION_EVM
    },
    [deleteConnectionEvm.fulfilled]: (state, action) => {
      state.data_evm = null
      state.status_evm = SUCCESS_DELETE_CONNECTION_EVM
      state.holding_evm = null
    },
    [deleteConnectionEvm.rejected]: (state, action) => {
      state.status_evm = FAILED_DELETE_CONNECTION_EVM
    }
  }
})

export default evmSlice.reducer
