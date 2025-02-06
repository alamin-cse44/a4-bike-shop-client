import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import {
  useCreatePaymentMutation,
  useDeleteOrderMutation,
  useGetOrdersByEmailQuery,
  useUpdateOrderMutation,
} from "../redux/features/order/orderApi";
import { TOrder, TResponse } from "../types";

const UserOrder = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const user = useAppSelector(selectCurrentUser);
  const [createPayment] = useCreatePaymentMutation();
  // Fetch data using RTK Query
  const { data, isLoading } = useGetOrdersByEmailQuery({
    page: page + 1, // Backend expects 1-based pagination
    limit,
    orderStatus: filter,
    sortOrder: "desc",
  });

  console.log(data?.data)

  const handlePaginationChange = (params: {
    page: number;
    pageSize: number;
  }) => {
    setPage(params.page);
    setLimit(params.pageSize);
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  if (!user?.userEmail) {
    return <CircularProgress />;
  }

  const handlePayment = async (data: TOrder) => {
    console.log("row data", data);

    const res = await createPayment(data);
    console.log("res", res);
    if (res?.data?.data) {
      window.open(res?.data?.data, "_blank");
    } else {
      toast.error("Failed to create payment", {
        duration: 2000,
      });
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 215 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 250,
      renderCell: (params: any) => (
        <>
          {params.row.paymentStatus === "pending" && (
            <Box display={"flex"} gap={2} mt={1}>
              {" "}
              <Button color="error" variant="contained">
                Unpaid
              </Button>
              <Button
                onClick={() => handlePayment(params.row)}
                color="error"
                variant="outlined"
              >
                Click to pay
              </Button>
            </Box>
          )}
          {params.row.paymentStatus === "success" && (
            <Button color="success" variant="contained">
              PAID
            </Button>
          )}
        </>
      ),
    },
    {
      field: "image",
      headerName: "Product Image",
      width: 120,
      renderCell: (params: any) => (
        <img
          src={params.row.product.image}
          alt="Product"
          style={{ width: 50, height: 50, borderRadius: 5 }}
        />
      ),
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 250,
      renderCell: (params: any) => params.row.product.name,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 150,
      renderCell: (params: any) => params.row.customer.name,
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "totalPrice", headerName: "Total Price ($)", width: 150 },
    {
      field: "current_status",
      headerName: "Oreder Status",
      width: 150,
      renderCell: (params: any) => (
        <>
          {params.row.orderStatus === "pending" && (
            <Button color="primary" variant="contained">
              {params.row.orderStatus}
            </Button>
          )}
          {params.row.orderStatus === "confirmed" && (
            <Button color="secondary" variant="contained">
              {params.row.orderStatus}
            </Button>
          )}
          {params.row.orderStatus === "delivered" && (
            <Button color="success" variant="contained">
              {params.row.orderStatus}
            </Button>
          )}
          {params.row.orderStatus === "cancel" && (
            <Button color="error" variant="contained">
              {params.row.orderStatus}
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      {/* 🔍 Search Input */}
      <Box mb={2} display={"flex"} alignItems={"end"} justifyContent={"end"}>
        {/* 📌 Order Status Filter */}
        <TextField
          select
          label=""
          variant="outlined"
          sx={{ minWidth: 200, ml: 2 }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          SelectProps={{ native: true }}
        >
          <option value="">Filter by order status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
          <option value="cancel">Canceled</option>
        </TextField>
      </Box>

      {/* 🚴 Data Table */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      )}
      <DataGrid
        rows={data?.data || []}
        columns={columns}
        rowCount={data?.data?.length || 0} // ✅ Total count from backend
        paginationMode="server" // ✅ Enable server-side pagination
        paginationModel={{ page, pageSize: limit }}
        onPaginationModelChange={handlePaginationChange} // ✅ Handle pagination
        pageSizeOptions={[5, 10, 20, 50]}
        loading={isLoading}
        getRowId={(row) => row._id} // ✅ Use _id as row key
      />
    </Box>
  );
};

export default UserOrder;
