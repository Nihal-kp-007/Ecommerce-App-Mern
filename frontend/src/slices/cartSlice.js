import { createSlice } from "@reduxjs/toolkit";
import updateCart from "../utils/cartutils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shipping: {},
      paymentMethod: {},
      paymentResult: { id: "" },
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
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
    },
    resetCart: (state) =>
      (state = { cartItems: [], shipping: {}, paymentMethod: "" }),

    saveShippingAddress: (state, action) => {
      state.shipping = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
    savePaymentResult: (state, action) => {
      state.paymentResult = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  resetCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  savePaymentResult,
} = cartSlice.actions;
export default cartSlice.reducer;
