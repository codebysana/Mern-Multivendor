import { createReducer } from "@reduxjs/toolkit";
import { addToWishlist, removeFromWishlist } from "../actions/wishlistAction";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToWishlist, (state, action) => {
      const item = action.payload;
      const itemId = item?._id || item?.id;
      const isItemExist = state.wishlist.find((i) => {
        const existingId = i._id || i.id;
        return existingId && itemId && existingId === itemId;
      });
      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) => {
          const existingId = i._id || i.id;
          return existingId && itemId && existingId === itemId ? { ...i, ...item, _id: itemId } : i;
        });
      } else {
        // normalize to always include _id for easier matching
        const normalized = { ...item, _id: item._id || item.id };
        state.wishlist.push(normalized);
      }
    })
    .addCase(removeFromWishlist, (state, action) => {
      const id = action.payload;
      state.wishlist = state.wishlist.filter((i) => {
        const existingId = i._id || i.id;
        // keep items whose id does NOT match the removed id
        return !(existingId && existingId === id);
      });
    });
});
