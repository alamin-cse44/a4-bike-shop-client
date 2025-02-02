import { TResponseRedux, TUserRegistration } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value) params.append(key, value.toString());
        });
        return {
          url: "/users/all-users",
          method: "GET",
          params: params,
        };
      },
      // we can return data from here to ignore the others response
      transformResponse: (response: TResponseRedux<TUserRegistration[]>) => {
        // console.log("inside redux", response);
        return {
          data: response?.data,
        };
      },
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getSignleUser: builder.query({
      query: (email) => {
        return {
          url: `/users/single-user/${email}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    // last bracket
  }),
});

export const { useCreateUserMutation, useGetSignleUserQuery, useGetAllUsersQuery } =
  userManagementApi;
