import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimal = (num) => {
  return num.toFixed(2);
};

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
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

      state.taxPrice = addDecimal(0.15 * state.itemsPrice);

      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== item._id);
      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      state.shippingPrice = addDecimal(0);
      state.taxPrice = addDecimal(0.15 * state.itemsPrice);

      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);
      if (state.cartItems.length == 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
