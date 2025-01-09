import { createSlice } from "@reduxjs/toolkit";
import updateCart from "../utils/cartutils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log(item);
      console.log(typeof state.cartItems);
      const existingItem = state.cartItems.find((x) => x._id == item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) => {
          return x._id === existingItem._id ? item : x;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== item._id);
      return updateCart(state);
      // if (state.cartItems.length == 0) {
      //   localStorage.removeItem("cart");
      // } else {
      //   localStorage.setItem("cart", JSON.stringify(state));
      // }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
