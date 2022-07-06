import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../api/BaseRequest'

export const getBlogs = createAsyncThunk(
  'blogs/getBlogs',
  async(params) => {
    return await get('blogs', params)
  }
)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: {},
    status: null
  },
  extraReducers: {
    // get blogs
    [getBlogs.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.blogs = action.payload
      state.status = 'success'
    },
    [getBlogs.rejected]: (state, action) => {
      state.status = 'failed'
    }
  }
})

export default blogsSlice.reducer
