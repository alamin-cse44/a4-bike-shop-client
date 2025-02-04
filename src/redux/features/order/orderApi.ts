import { TOrder, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value) params.append(key, value.toString());
        });
        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      // TODO: order response
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        // console.log("inside redux", response);
        return {
          data: response?.data,
        };
      },
      providesTags: [{ type: "Order", id: "LIST" }],
    }),
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/orders",
        method: "POST",
        body: orderInfo,
      }),
      // Invalidate the 'Order' list after creation
      invalidatesTags: [
        { type: "Order", id: "LIST" },
      ],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      // Invalidate the 'Order' list after creation
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    updateOrder: builder.mutation({
      query: (orderInfo) => ({
        url: `/orders/${orderInfo._id}`,
        method: "PATCH",
        body: orderInfo,
      }),
      // Invalidate the 'Order' list after creation
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    getSignleOrder: builder.query({
      query: (id) => {
        return {
          url: `/orders/${id}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetSignleOrderQuery,
  useUpdateOrderMutation,
} = orderApi;
