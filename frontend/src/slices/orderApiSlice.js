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
        url: "/api/orders/myorders",
      }),
    }),
    getAllOrders: build.query({
      query: () => ({
        url: "/api/orders",
      }),
    }),
    orderToPaid: build.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/pay`,
        method: "PUT",
      }),
    }),
    getKey: build.query({
      query: () => ({
        url: `/api/orders/key`,
      }),
    }),
    orderToDelivery: build.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useOrderToPaidMutation,
  useGetKeyQuery,
  useOrderToDeliveryMutation,
} = orderApiSlice;
