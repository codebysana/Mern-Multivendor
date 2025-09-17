import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  orders: [],
  adminOrders: [],
  error: null,
  adminOrderLoading: false,
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
      state.adminOrderLoading = true;
    })
    .addCase("adminAllOrdersSuccess", (state, action) => {
      state.adminOrderLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase("adminAllOrdersFail", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })
    .addCase("updateOrderStatusRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("updateOrderStatusSuccess", (state, action) => {
      state.isLoading = false;

      const updatedOrder = action.payload; // update specific order in state.orders
      state.orders = state.orders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      );
    })
    .addCase("updateOrderStatusFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
