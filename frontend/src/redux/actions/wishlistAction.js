// add to wishlist
export const addToWishlist = (data) => async (dispatchEvent, getState) => {
  dispatchEvent({
    type: "addToWishlist",
    payload: data,
  });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};

// remove from wishlist
export const removeFromWishlist = (data) => async (dispatchEvent, getState) => {
  dispatchEvent({
    type: "removeFromWishlist",
    payload: data._id,
  });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlist)
  );
  return data;
};
