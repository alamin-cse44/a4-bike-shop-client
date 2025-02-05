import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { TOrder, TResponse } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "../../redux/features/order/orderApi";

type FilterState = Record<string, string | number>;

const Orders = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const user = useAppSelector(selectCurrentUser);

  // Fetch data using RTK Query
  const { data, isLoading } = useGetAllOrdersQuery({
    page: page + 1, // Backend expects 1-based pagination
    limit,
    search,
    orderStatus: filter,
    sortOrder: "desc",
  });

  console.log("data", data);

  // Delete functionality
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = (productId: string) => {
    toast.custom(
      (t) => (
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "medium", color: "blue" }}>
            Are you sure you want to delete this product?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            {/* Confirm Button */}
            <Button
              onClick={async () => {
                await deleteRow(productId);
                toast.dismiss(t); // Close toast after deletion
              }}
              variant="contained"
              color="error"
              sx={{ "&:hover": { backgroundColor: "error.dark" } }}
            >
              Yes
            </Button>

            {/* Cancel Button */}
            <Button
              onClick={() => {
                toast.dismiss(t);
              }}
              variant="outlined"
              sx={{
                borderColor: "grey.300",
                color: "text.secondary",
                "&:hover": {
                  borderColor: "grey.400",
                  backgroundColor: "grey.100",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ),
      {
        position: "top-center",
        duration: 20000,
      }
    );
  };

  const deleteRow = async (productId: string) => {
    try {
      const res = (await deleteOrder(productId)) as TResponse<TOrder>;
      console.log("res", res);
      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("Product is deleted!", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to delete Product", {
        duration: 2000,
      });
    }
  };

  const [updateOrder] = useUpdateOrderMutation();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const orderInfo = {
      _id: orderId,
      orderStatus: newStatus,
    };
    try {
      await updateOrder(orderInfo);
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handlePaginationChange = (params: {
    page: number;
    pageSize: number;
  }) => {
    setPage(params.page);
    setLimit(params.pageSize);
  };

  const columns = [
    // { field: "_id", headerName: "ID", width: 150 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params: any) => (
        <>
          {params.row.paymentStatus === "pending" && (
            <Button color="primary" variant="outlined">
              {params.row.paymentStatus}
            </Button>
          )}
          {params.row.paymentStatus === "success" && (
            <Button color="success" variant="outlined">
              {params.row.paymentStatus}
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
    {
      field: "orderStatus",
      headerName: "Update Status",
      width: 180,
      renderCell: (params: any) => (
        <>
          {params.row.orderStatus === "pending" && (
            <Select
              value={params.row.orderStatus}
              onChange={(e) =>
                handleStatusChange(params.row._id, e.target.value)
              }
              size="small"
              fullWidth
            >
              <MenuItem value="pending" disabled>
                Pending
              </MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancel">Cancel</MenuItem>
            </Select>
          )}

          {params.row.orderStatus === "confirmed" && (
            <Select
              value={params.row.orderStatus}
              onChange={(e) =>
                handleStatusChange(params.row._id, e.target.value)
              }
              size="small"
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed" disabled>
                Confirmed
              </MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancel">Cancel</MenuItem>
            </Select>
          )}

          {params.row.orderStatus === "delivered" && (
            <Select
              value={params.row.orderStatus}
              onChange={(e) =>
                handleStatusChange(params.row._id, e.target.value)
              }
              size="small"
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="delivered" disabled>
                Delivered
              </MenuItem>
              <MenuItem value="cancel">Cancel</MenuItem>
            </Select>
          )}
          {params.row.orderStatus === "cancel" && (
            <Select
              value={params.row.orderStatus}
              onChange={(e) =>
                handleStatusChange(params.row._id, e.target.value)
              }
              size="small"
              fullWidth
            >
              <MenuItem value="pending" disabled>
                Pending
              </MenuItem>
              <MenuItem value="confirmed" disabled>
                Confirmed
              </MenuItem>
              <MenuItem value="delivered" disabled>
                Delivered
              </MenuItem>
              <MenuItem value="cancel" disabled>
                Cancel
              </MenuItem>
            </Select>
          )}
        </>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: any) => (
        <IconButton
          color="error"
          onClick={() => {
            if (user?.userRole !== "admin") {
              toast.error("Only admins can delete users!", {
                duration: 2000,
              });
              return;
            }
            handleDelete(params.row._id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", mt: 2 }}>
      {/* 🔍 Search Input */}
      <Box mb={2}>
        <TextField
          label="Search order by email, phone or status"
          variant="outlined"
          sx={{ minWidth: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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
          <option value="">All</option>
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

export default Orders;
