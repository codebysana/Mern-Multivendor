import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  seller: null,
  error: null,
  isSeller: false,
  sellers: [],
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "An error occurred";
      state.isSeller = false;
    })
    // get all sellers -- admin
    .addCase("getAllSellersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase("getAllSellersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "An error occurred";
    }) 
    // seller logout
    .addCase("sellerLogout", (state) => {
      state.isLoading = false;
      state.isSeller = false;
      state.seller = null;
      state.error = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
