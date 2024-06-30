import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: [],
    myPosts: []
  },
  reducers: {
    setPosts: (state, action) => {
      state.allPosts = action.payload.allPosts
      state.myPosts = action.payload.myPosts
    },
    removePosts: (state) => {
      state.allPosts = []
      state.myPosts = []
    }
  }
})

export const { setPosts, removePosts } = postSlice.actions;
export const postReducer = postSlice.reducer;