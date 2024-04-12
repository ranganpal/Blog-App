import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authStatus: false,
    userData: null
  },
  reducers: {
    authLogin: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;  // may be an error 
    },
    authLogout: (state) => {
      state.authStatus = false;
      state.userData = null;
    }
  }
})

export const { authLogin, authLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;