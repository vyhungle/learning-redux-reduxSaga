import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  errors: [],
  user: {},
  token: null,
};

export const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUser: (state, { payload }) => {    
      state.user = payload.user;
    },
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isAuth = true;
      state.isLoading = false;
      state.token = payload.token;
      state.errors = [];
      localStorage.setItem("Token", payload.token);
    },
    loginFail: (state, { payload }) => {
      state.isAuth = false;
      state.isLoading = false;
      state.errors = payload.errors;
      state.token = null;
      state.user = {};
      localStorage.removeItem("Token");
    },
  },
});

export const { loginPending, loginSuccess, loginFail, authUser } =
  LoginSlice.actions;

export default LoginSlice.reducer;
