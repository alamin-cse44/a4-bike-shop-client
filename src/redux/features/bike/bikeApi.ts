import { TBike, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBikes: builder.query({
      query: (args) => {
        // const params = new URLSearchParams();
        // params.append(args[0].name, args[0].value);
        return {
          url: "/bikes",
          method: "GET",
        //   params: params,
        };
      },
      // we can return data from here to ignore the others response
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        console.log("inside redux", response);
        return {
          data: response?.data,
        };
      },
    }),
    createBikes: builder.mutation({
      query: (bikeInfo) => ({
        url: "/bikes",
        method: "POST",
        body: bikeInfo,
      }),
    }),
  }),
});

export const { useGetAllBikesQuery, useCreateBikesMutation } = bikeApi;
