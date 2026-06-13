import { createAction } from "@reduxjs/toolkit";

export const addToWishlist = createAction("addToWishlist");
export const removeFromWishlist = createAction("removeFromWishlist");

// add to wishlist
export const addToWishlistAsync = (data) => async (dispatch, getState) => {
  dispatch(addToWishlist(data));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

// remove from wishlist
export const removeFromWishlistAsync = (id) => async (dispatch, getState) => {
  dispatch(removeFromWishlist(id));
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return id;
};
