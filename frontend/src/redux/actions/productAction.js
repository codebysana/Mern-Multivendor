import axios from "axios";
const { server } = require("../../server");

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "createProductRequest" });

    const token = localStorage.getItem("shop_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const config = { withCredentials: true, headers };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      productData,
      config,
    );
    dispatch({
      type: "createProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "createProductFail",
      payload: error.response?.data?.message || "Unable to load user",
    });
  }
};

// get all products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const token = localStorage.getItem("shop_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`,
      { withCredentials: true, headers },
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data?.products,
    });
    console.log("GET ALL PRODUCTS RESPONSE:", data);
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response);
    console.log("MESSAGE:", error.message);
    dispatch({
      type: "getAllProductsShopFail",
      payload: error.response?.data?.message || "Unable to load user",
      error: error.response?.data,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });
    const token = localStorage.getItem("shop_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
        headers,
      },
    );
    dispatch({
      type: "deleteProductSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response?.data?.message || "Unable to load user",
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);

    dispatch({
      type: "getAllProductsSuccess",
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFail",
      payload: error.response?.data?.message,
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getProductRequest" });

    const { data } = await axios.get(`${server}/product/get-product/${id}`);

    dispatch({
      type: "getProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getProductFail",
      payload: error.response?.data?.message,
    });
  }
};
