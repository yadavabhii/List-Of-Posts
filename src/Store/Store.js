import { postsSlice } from './PostList.js';
import { configureStore } from '@reduxjs/toolkit';


const Store = configureStore({
  reducer: {
    posts: postsSlice
  }
});


export default Store;