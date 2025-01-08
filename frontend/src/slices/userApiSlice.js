import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => ({
        url: "/api/users",
        method: "POST",
        body: data,
      }),
    }),
    authUser: build.mutation({
      query: (data) => ({
        url: "/api/users/auth",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useAuthUserMutation,
  useLogoutUserMutation,
} = userApiSlice;
