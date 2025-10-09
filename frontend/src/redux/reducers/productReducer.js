import { createReducer } from "@reduxjs/toolkit";
import { productData } from "../../static/data";

const initialState = {
  isLoading: true,
  products: [],
  allProducts: [],
  error: null,
  success: false,
  product: null,
  message: "",
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("createProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("createProductSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("createProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    //get all products of shop
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // delete product of a shop
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // get all products admin
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts =
        action.payload && action.payload.length > 0
          ? action.payload
          : productData;
    })
    .addCase("getAllProductsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.allProducts = productData;
    })
    // --- Get Single Product ---
    .addCase("getProductRequest", (state) => {
      state.isLoading = true;
      state.product = null; // reset before loading new
    })
    .addCase("getProductSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    })
    .addCase("getProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
