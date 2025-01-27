import { baseApi } from "../../api/baseApi";


const bikeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllBikes: builder.query({
        query: () => ({
          url: "/bikes",
          method: "GET",
        }),
      }),
    }),
})

export const { useGetAllBikesQuery } = bikeApi;