import axios from "axios";
import { server } from "../../server";

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUserOrdersRequest",
    });
    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );
    dispatch({
      type: "getAllUserOrdersSuccess",
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllUserOrdersFail",
      payload: error.response.data?.message,
    });
  }
};

// get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllShopOrdersRequest",
    });
    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );
    dispatch({
      type: "getAllShopOrdersSuccess",
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllShopOrdersFail",
      payload: error.response.data?.message,
    });
  }
};

// get all orders of admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });
    const { data } = await axios.get(
      `${server}/order/admin-all-orders`,
      { withCredentials: true }
    );
    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFail",
      payload: error.response.data?.message,
    });
  }
};
