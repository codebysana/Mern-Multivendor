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
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellersFail",
      payload: error.response.data.message,
    });
  }
};
