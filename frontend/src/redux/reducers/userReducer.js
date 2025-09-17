import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,
  error: null,
  isAuthenticated: false,
  loading: false,
  successMessage: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    // update user information
    .addCase("updateUserInfoRequest", (state, action) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // update user address
    .addCase("updateUserAddressRequest", (state, action) => {
      state.addressLoading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    // delete user address
    .addCase("deleteUserAddressRequest", (state, action) => {
      state.addressLoading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("deleteUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    // get all users -- admin
    .addCase("getAllUsersRequest", (state, action) => {
      state.usersLoading = true;
    })
    .addCase("getAllUsersSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersFail", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })
    // Logout
    .addCase("logoutRequest", (state) => {
      state.loading = true;
    })
    .addCase("logoutSuccess", (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    })
    .addCase("logoutFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
    });
});
