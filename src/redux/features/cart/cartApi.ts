import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/carts",
        method: "POST",
        body: cartInfo,
      }),
      // Invalidate the 'Cart' list after creation
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    // updateBikes: builder.mutation({
    //   query: (bikeInfo) => ({
    //     url: `/bikes/${bikeInfo._id}`,
    //     method: "PATCH",
    //     body: bikeInfo,
    //   }),
    //   // Invalidate the 'Bike' list after creation
    //   invalidatesTags: [{ type: "Bike", id: "LIST" }],
    // }),
    getCartByEmail: builder.query({
      query: (email) => {
        return {
          url: `/carts/${email}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const { useCreateCartMutation, useGetCartByEmailQuery, useDeleteCartMutation } = cartApi;
