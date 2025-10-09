const { default: axios } = require("axios");
const { server } = require("../../server");

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "createProductRequest" });

    const { data } = await axios.post(
      `${server}/product/create-product`,
      productData,
      { withCredentials: true }
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
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFail",
      payload: error.response?.data?.message || "Unable to load user",
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
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
