import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, getEvm, del } from '../api/evmService'
import {
  LOADING_IMPORT_CONNECTION_EVM,
  SUCCESS_IMPORT_CONNECTION_EVM,
  FAILED_IMPORT_CONNECTION_EVM,
  LOADING_GET_ALL_CONNECTION_EVM,
  SUCCESS_GET_ALL_CONNECTION_EVM,
  FAILED_GET_ALL_CONNECTION_EVM,
  LOADING_GET_ALL_HOLDING_EVM,
  SUCCESS_GET_ALL_HOLDING_EVM,
  FAILED_GET_ALL_HOLDING_EVM,
  LOADING_DELETE_CONNECTION_EVM,
  SUCCESS_DELETE_CONNECTION_EVM,
  FAILED_DELETE_CONNECTION_EVM
//   LOADING_UPDATE_CONNECTION_EVM,
//   SUCCESS_UPDATE_CONNECTION_EVM,
//   FAILED_UPDATE_CONNECTION_EVM
} from '../constants/StatusMessageConstants'

// import { getCookie, STORAGEKEY } from '../utils/storage'
// const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1widXNlcklkXCI6MCxcImFjY291bnRJZFwiOjAsXCJ1dWlkXCI6XCI0NDcwOWZmZmNkYmU0ZDk2OTFjYjc2NzhmMGNmY2M0OFwiLFwiZW1haWxcIjpcImRpbmhoaW5oMTAwOTE5OThAZ21haWwuY29tXCJ9IiwiZXhwIjoxNjU4OTQ4MzMwfQ.YBQtR6wfafCkA8MscPCJyAv62dI1aUmisgPYsELyXATvUUdoO1zy0VdWJX6rv72jLXa6wgNrmZExzjM0KG7sed6U41mXrL19RNHqTsc8VuotcqnqGsezf_WyfQsGdLLXxTyNznpeAltHsRI2rDt_BUBqH7K0cVruxoFKNLi1AStePq7sxXnrHLrfs2BMIE3ZZBmyFmkwDX163p-qgit8HxEk9HosEIlLKu7RaiKEONlZkea20lwioRmhNBzLBGOtsYeAEDtAoe4e9WmblUTsoDLRsNZEnFXUmSc1M-tpbFVC_pkwnudqIddeaJVCZnq3ThRYIi1-RcA_WZhKUGedArRv8lbGkmAn5l1oPSDVOUHRAvJd4SE40txloXoKeGEyqLhqNbuQKjiIqS-mbCZOX8r1LWNOV4XOLsE-R_TCZ-yvxpem24nc6vmtKUNyI92bg7myC8o1rsGzhuN9ZRphebS7HEm-sDZ4Po5cvt6NS9dIAqjsYTY9IMBiQg1oUlGQm-fuk9wzfAg2tqWk5uHC76zT8Nynm3SQN0Uh_h1VajLuinnlQH9WkdmAZZ2RteLrDNpSCt2ZDrNixYxUF58kiXCLLw3Co-7xK1gVPL7DYWwTXtJAWEq0VHnUurPiG7QsFmA4q-p_pnibRRX2b67Q1BmNIJAxcx4IvJCPnKbqV-U'
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

export const getAllConnectionEvm = createAsyncThunk(
  'connections/getAllConnectionEvm',
  async() => {
    return await getEvm('evm/connection/current-connections')
  }
)

export const getAllHoldingEvm = createAsyncThunk(
  'connections/getAllHoldingEvm',
  async() => {
    return await getEvm('evm/holdings')
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

    // get all connection evm
    [getAllConnectionEvm.pending]: (state, action) => {
      state.status_evm = LOADING_GET_ALL_CONNECTION_EVM
    },
    [getAllConnectionEvm.fulfilled]: (state, action) => {
      state.data_evm = null
      state.status_evm = SUCCESS_GET_ALL_CONNECTION_EVM
      state.list_connection_evm = action.payload.data
    },
    [getAllConnectionEvm.rejected]: (state, action) => {
      state.status_evm = FAILED_GET_ALL_CONNECTION_EVM
    },

    // get all holding evm
    [getAllHoldingEvm.pending]: (state, action) => {
      state.status_evm = LOADING_GET_ALL_HOLDING_EVM
    },
    [getAllHoldingEvm.fulfilled]: (state, action) => {
      state.data_evm = null
      state.status_evm = SUCCESS_GET_ALL_HOLDING_EVM
      state.holding_evm = action.payload.data
    },
    [getAllHoldingEvm.rejected]: (state, action) => {
      state.status_evm = FAILED_GET_ALL_HOLDING_EVM
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
