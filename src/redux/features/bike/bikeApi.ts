import { baseApi } from "../../api/baseApi";


const bikeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllBikes: builder.query({
        query: () => ({
          url: "/bikes",
          method: "GET",
        }),
      }),
      createBikes: builder.mutation({
        query: (bikeInfo) => ({
            url: "/bikes",
            method: "POST",
            body: bikeInfo,
        })
      })
    }),
})

export const { useGetAllBikesQuery, useCreateBikesMutation } = bikeApi;