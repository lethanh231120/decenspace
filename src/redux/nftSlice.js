import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, getNFT, del } from '../api/nftService'
import {
  LOADING_IMPORT_CONNECTION_NFT,
  SUCCESS_IMPORT_CONNECTION_NFT,
  FAILED_IMPORT_CONNECTION_NFT,
  LOADING_GET_ALL_TRANSACTION_NFT,
  SUCCESS_GET_ALL_TRANSACTION_NFT,
  FAILED_GET_ALL_TRANSACTION_NFT,
  LOADING_DELETE_CONNECTION_NFT,
  SUCCESS_DELETE_CONNECTION_NFT,
  FAILED_DELETE_CONNECTION_NFT
//   LOADING_UPDATE_CONNECTION_NFT,
//   SUCCESS_UPDATE_CONNECTION_NFT,
//   FAILED_UPDATE_CONNECTION_NFT
} from '../constants/StatusMessageConstants'

import { getCookie, STORAGEKEY } from '../utils/storage'
const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}
export const importConnectionNft = createAsyncThunk(
  'nft/importConnectionNft',
  async(info) => {
    const { data, chainId } = info
    return await post(`nft/import-address?chainId=${chainId}`, data, config)
  }
)

// export const getAllConnectionNft = createAsyncThunk(
//   'nft/getAllConnectionNft',
//   async() => {
//     return await getNFT('nft/connection/current-connections')
//   }
// )

export const getAllTransactionByNft = createAsyncThunk(
  'nft/getAllTransactionByNft',
  async(nftId) => {
    return await getNFT(`nft/transaction/nftId=${nftId}`)
  }
)

export const deleteConnectionNft = createAsyncThunk(
  'nft/deleteConnectionNft',
  async(id) => {
    return await del(`nft/connection/connectionId=${id}`)
  }
)

const nftSlice = createSlice({
  name: 'import Connection NFT',
  initialState: {
    data_nft: null,
    status_nft: null,
    list_nft: []
  },
  extraReducers: {
    // post connection nft
    [importConnectionNft.pending]: (state, action) => {
      state.status_nft = LOADING_IMPORT_CONNECTION_NFT
    },
    [importConnectionNft.fulfilled]: (state, action) => {
      state.data_nft = action.payload
      state.status_nft = SUCCESS_IMPORT_CONNECTION_NFT
    },
    [importConnectionNft.rejected]: (state, action) => {
      state.status_nft = FAILED_IMPORT_CONNECTION_NFT
    },

    // get all transaction eft
    [getAllTransactionByNft.pending]: (state, action) => {
      state.status_nft = LOADING_GET_ALL_TRANSACTION_NFT
    },
    [getAllTransactionByNft.fulfilled]: (state, action) => {
      state.status_nft = SUCCESS_GET_ALL_TRANSACTION_NFT
      state.list_nft = action.payload.data
    },
    [getAllTransactionByNft.rejected]: (state, action) => {
      state.status_nft = FAILED_GET_ALL_TRANSACTION_NFT
    },

    // delete connection evm
    [deleteConnectionNft.pending]: (state, action) => {
      state.status_nft = LOADING_DELETE_CONNECTION_NFT
    },
    [deleteConnectionNft.fulfilled]: (state, action) => {
      state.status_nft = SUCCESS_DELETE_CONNECTION_NFT
    },
    [deleteConnectionNft.rejected]: (state, action) => {
      state.status_nft = FAILED_DELETE_CONNECTION_NFT
    }
  }
})

export default nftSlice.reducer
