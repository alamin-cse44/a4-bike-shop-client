import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    getSignleUser: builder.query({
      query: (email) => {
        return {
          url: `/users/single-user/${email}`,
          method: "GET",
        };
      },
      // providesTags: [{ type: "Bike", id: "LIST" }],
    }),
    // last bracket
  }),
});

export const { useCreateUserMutation, useGetSignleUserQuery } =
  userManagementApi;
