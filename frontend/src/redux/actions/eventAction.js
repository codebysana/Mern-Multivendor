const { default: axios } = require("axios");
const { server } = require("../../server");

export const createEvent = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreationRequest" });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      formData,
      config
    );
    dispatch({
      type: "eventCreationSuccess",
      payload: data?.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreationFail",
      payload: error.response?.data?.message || "Unable to load user",
    });
  }
};

// get all Events of a shop
export const getAllEventsShop = (shopId) => async (dispatch) => {
  try {
    if (!shopId) return;

    dispatch({
      type: "getAllEventsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/event/get-all-events/${shopId}`
    );
    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data?.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFail",
      payload: error.response?.data?.message || "Unable to load user",
    });
  }
};

// delete Event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });
    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteEventSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFail",
      payload: error.response?.data?.message || "Unable to load user",
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });
    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data?.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFail",
      payload: error.response?.data?.message || "Unable to load user",
    });
  }
};
