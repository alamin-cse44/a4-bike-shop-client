import { TBike, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllBikes: builder.query({
    //   query: (args) => {
    //     // const params = new URLSearchParams();
    //     // params.append(args[0].name, args[0].value);
    //     return {
    //       url: "/bikes",
    //       method: "GET",
    //       //   params: params,
    //     };
    //   },
    //   // we can return data from here to ignore the others response
    //   transformResponse: (response: TResponseRedux<TBike[]>) => {
    //     // console.log("inside redux", response);
    //     return {
    //       data: response?.data,
    //     };
    //   },
    //   providesTags: [{ type: "Bike", id: "LIST" }],
    // }),
    createCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/carts",
        method: "POST",
        body: cartInfo,
      }),
      // Invalidate the 'Cart' list after creation
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    // deleteBikes: builder.mutation({
    //   query: (id) => ({
    //     url: `/bikes/${id}`,
    //     method: "DELETE",
    //   }),
    //   // Invalidate the 'Bike' list after creation
    //   invalidatesTags: [{ type: "Bike", id: "LIST" }],
    // }),
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

export const { useCreateCartMutation, useGetCartByEmailQuery } = cartApi;
