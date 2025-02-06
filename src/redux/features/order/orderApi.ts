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
        return {
          data: response?.data,
        };
      },
      providesTags: [{ type: "Order", id: "LIST" }],
    }),
    getOrdersByEmail: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        Object.entries(args).forEach(([key, value]) => {
          if (value) params.append(key, value.toString());
        });
        return {
          url: `/orders/by-email`,
          method: "GET",
          params: params,
        };
      },
      // TODO: order response
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
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
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    // handle payment
    createPayment: builder.mutation({
      query: (orderInfo) => ({
        url: "/payments",
        method: "POST",
        body: orderInfo,
      }),
      // Invalidate the 'Order' list after creation
      invalidatesTags: [{ type: "Order", id: "LIST" }],
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
  useCreatePaymentMutation,
  useGetAllOrdersQuery,
  useGetOrdersByEmailQuery,
  useDeleteOrderMutation,
  useGetSignleOrderQuery,
  useUpdateOrderMutation,
} = orderApi;
