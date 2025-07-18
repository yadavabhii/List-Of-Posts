import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
})



const postSlice = createSlice({
  name: "posts",
  initialState: {
    allposts: [],
    status: "idle",
    error: null
  },
  reducers: {
    removePost: (state, action) => {
      const postToRemove = action.payload;
      state.allposts.splice(postToRemove, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allposts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

export const { removePost } = postSlice.actions;
export const postsSlice = postSlice.reducer;


