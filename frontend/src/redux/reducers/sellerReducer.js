import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  seller: null,
  error: null,
  isSeller: false,
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadSellerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('LoadSellerSuccess', (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action?.payload;
    })
    .addCase('LoadSellerFail', (state, action) => {
      state.isLoading = false;
      state.error = action?.payload || "An error occurred";
      state.isSeller = false;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
