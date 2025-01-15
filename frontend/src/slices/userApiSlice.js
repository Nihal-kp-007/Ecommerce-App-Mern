import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => ({
        url: "/api/users",
        method: "POST",
        body: data,
      }),
      providesTags: ["Users"],
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
    updateUserProfile: build.mutation({
      query: (data) => ({
        url: "/api/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
    getAllUsers: build.query({
      query: (data) => ({
        url: "/api/users",
        body: data,
      }),
      providesTags: ["Users"],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/api/users/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users", "User"],
    }),
    getUser: build.query({
      query: (id) => ({
        url: `/api/users/${id}`,
      }),
      providesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useAuthUserMutation,
  useLogoutUserMutation,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
} = userApiSlice;
