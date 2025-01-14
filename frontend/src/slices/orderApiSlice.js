import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => ({
        url: "/api/orders",
        method: "POST",
        body: data,
      }),
    }),
    getOrderById: build.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
      }),
    }),
    getMyOrders: build.query({
      query: () => ({
        url: '/api/orders/myorders',
      }),
    }),
    getAllOrders: build.query({
      query: () => ({
        url: '/api/orders',
      }),
    }),
  }),
});

export const {useCreateOrderMutation,useGetOrderByIdQuery, useGetMyOrdersQuery, useGetAllOrdersQuery} = orderApiSlice;
