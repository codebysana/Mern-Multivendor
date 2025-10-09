const { default: axios } = require("axios");
const { server } = require("../../server");

// get all sellers -- admins

export const getAllSellers = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });
    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllSellersSuccess",
      payload: data?.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellersFail",
      payload: error.response.data?.message,
    });
  }
};

// load seller data --> Login
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });

    const { data } = await axios.get(`${server}/shop/get-seller`, {
      withCredentials: true,
    });

    if (!data.seller) {
      throw new Error("No seller data received");
    }

    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
