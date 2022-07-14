import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, get, del, patch } from '../api/addressService'
import {
  LOADING_IMPORT_CONNECTION,
  SUCCESS_IMPORT_CONNECTION,
  FAILED_IMPORT_CONNECTION,
  LOADING_GET_ALL_CONNECTION,
  SUCCESS_GET_ALL_CONNECTION,
  FAILED_GET_ALL_CONNECTION,
  LOADING_DELETE_CONNECTION,
  SUCCESS_DELETE_CONNECTION,
  FAILED_DELETE_CONNECTION,
  LOADING_UPDATE_CONNECTION,
  SUCCESS_UPDATE_CONNECTION,
  FAILED_UPDATE_CONNECTION
} from '../constants/StatusMessageConstants'

export const importConnection = createAsyncThunk(
  'connections/importConnection',
  async(data) => {
    return await post('addresses/import-address', data)
  }
)

export const getAllConnection = createAsyncThunk(
  'connections/getAllConnection',
  async(data) => {
    return await get('addresses/connection/current-connections', data)
  }
)

export const deleteConnection = createAsyncThunk(
  'connections/deleteConnection',
  async(id) => {
    console.log(id)
    return await del(`addresses/connection/connectionId=${id}`)
  }
)

export const updateConnection = createAsyncThunk(
  'connections/updateConnection',
  async(info) => {
    const { id, data } = info
    console.log(id, data)
    return await patch(`addresses/connection/connectionId=${id}`, data)
  }
)

const addressSlice = createSlice({
  name: 'import Connection',
  initialState: {
    data: null,
    status: null,
    list_connection: null
  },
  extraReducers: {
    // post connection wallet bitcoins
    [importConnection.pending]: (state, action) => {
      state.status = LOADING_IMPORT_CONNECTION
    },
    [importConnection.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = SUCCESS_IMPORT_CONNECTION
      state.list_connection = null
    },
    [importConnection.rejected]: (state, action) => {
      state.status = FAILED_IMPORT_CONNECTION
    },

    // get all connection wallet bitcoins
    [getAllConnection.pending]: (state, action) => {
      state.status = LOADING_GET_ALL_CONNECTION
    },
    [getAllConnection.fulfilled]: (state, action) => {
      state.data = null
      state.status = SUCCESS_GET_ALL_CONNECTION
      state.list_connection = action.payload.data
    },
    [getAllConnection.rejected]: (state, action) => {
      state.status = FAILED_GET_ALL_CONNECTION
    },

    // delete connection wallet bitcoins
    [deleteConnection.pending]: (state, action) => {
      state.status = LOADING_DELETE_CONNECTION
    },
    [deleteConnection.fulfilled]: (state, action) => {
      state.data = null
      state.status = SUCCESS_DELETE_CONNECTION
      state.list_connection = null
    },
    [deleteConnection.rejected]: (state, action) => {
      state.status = FAILED_DELETE_CONNECTION
    },

    // delete connection wallet bitcoins
    [deleteConnection.pending]: (state, action) => {
      state.status = LOADING_DELETE_CONNECTION
    },
    [deleteConnection.fulfilled]: (state, action) => {
      state.data = null
      state.status = SUCCESS_DELETE_CONNECTION
      state.list_connection = null
    },
    [deleteConnection.rejected]: (state, action) => {
      state.status = FAILED_DELETE_CONNECTION
    },

    // update connection wallet bitcoins
    [updateConnection.pending]: (state, action) => {
      state.status = LOADING_UPDATE_CONNECTION
    },
    [updateConnection.fulfilled]: (state, action) => {
      state.data = null
      state.status = SUCCESS_UPDATE_CONNECTION
      state.list_connection = null
    },
    [updateConnection.rejected]: (state, action) => {
      state.status = FAILED_UPDATE_CONNECTION
    }
  }
})

export default addressSlice.reducer
