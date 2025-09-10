import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    //get all orders of user
    .addCase("getAllUserOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllUserOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllUserOrdersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // get all orders of shop
    .addCase("getAllShopOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllShopOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllShopOrdersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // get all admin orders
    .addCase("adminAllOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("adminAllOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase("adminAllOrdersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
