import { TBike, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value) params.append(key, value.toString());
        });
        return {
          url: "/bikes",
          method: "GET",
          params: params,
        };
      },
      // we can return data from here to ignore the others response
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        // console.log("inside redux", response);
        return {
          data: response?.data,
        };
      },
      providesTags: [{ type: "Bike", id: "LIST" }],
    }),
    createBikes: builder.mutation({
      query: (bikeInfo) => ({
        url: "/bikes",
        method: "POST",
        body: bikeInfo,
      }),
      // Invalidate the 'Bike' list after creation
      invalidatesTags: [{ type: "Bike", id: "LIST" }],
    }),
    deleteBikes: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      // Invalidate the 'Bike' list after creation
      invalidatesTags: [{ type: "Bike", id: "LIST" }],
    }),
    updateBikes: builder.mutation({
      query: (bikeInfo) => ({
        url: `/bikes/${bikeInfo._id}`,
        method: "PATCH",
        body: bikeInfo,
      }),
      // Invalidate the 'Bike' list after creation
      invalidatesTags: [{ type: "Bike", id: "LIST" }],
    }),
    getSignleBike: builder.query({
      query: (id) => {
        return {
          url: `/bikes/${id}`,
          method: "GET",
        };
      },
      providesTags: [
        { type: "Bike", id: "LIST" },
        { type: "Order", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBikesQuery,
  useCreateBikesMutation,
  useDeleteBikesMutation,
  useUpdateBikesMutation,
  useGetSignleBikeQuery,
} = bikeApi;
