import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import CustomPagination from "../../components/data-table/CustomPagination";
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

const Orders = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const user = useAppSelector(selectCurrentUser);

  // Fetch data using RTK Query
  const { data, isLoading } = useGetAllOrdersQuery({
    page: 1, // Always fetch from page 1
    limit: 999, // Fetch a large number to get "all" data for manual pagination
    search,
    orderStatus: filter,
    sortOrder: "desc",
  });

  const allOrders = data?.data || [];
  const totalItems = allOrders.length;
  const paginatedOrders = allOrders.slice(page * limit, (page + 1) * limit);

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const handleDelete = (orderId: string) => {
    toast.custom(
      (t) => (
        <Paper
          elevation={6}
          sx={{ p: 3, borderRadius: 2, textAlign: "center" }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium" }}>
            Are you sure you want to delete this order?
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              onClick={async () => {
                await deleteRow(orderId);
                toast.dismiss(t);
              }}
              variant="contained"
              color="error"
            >
              Yes, Delete
            </Button>
            <Button onClick={() => toast.dismiss(t)} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Paper>
      ),
      { position: "top-center", duration: 5000 },
    );
  };

  const deleteRow = async (orderId: string) => {
    try {
      const res = (await deleteOrder(orderId)) as TResponse<TOrder>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Order deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrder({ _id: orderId, orderStatus: newStatus });
      toast.success("Order status updated!");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handlePaginationChange = (params: {
    page: number;
    pageSize: number;
  }) => {
    setPage(params.page);
    setLimit(params.pageSize);
  };

  const columns: GridColDef[] = [
    {
      field: "paymentStatus",
      headerName: "Payment",
      width: 140,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height="100%">
          <Chip
            label={params.value?.toUpperCase()}
            color={params.value === "success" ? "success" : "warning"}
            size="small"
            variant="outlined"
          />
        </Box>
      ),
    },
    {
      field: "image",
      headerName: "Product",
      width: 100,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height="100%">
          <img
            src={params.row.product?.image}
            alt="Product"
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        </Box>
      ),
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: 200,
      valueGetter: (_value, row) => row.product?.name,
    },
    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
      valueGetter: (_value, row) => row.customer?.name,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "totalPrice",
      headerName: "Price",
      width: 100,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "orderStatus",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        const status = params.value;
        let color: "warning" | "primary" | "success" | "error" = "primary";
        if (status === "pending") color = "warning";
        else if (status === "delivered") color = "success";
        else if (status === "cancel" || status === "cancelled") color = "error";

        return (
          <Box display="flex" alignItems="center" height="100%">
            <Chip label={status?.toUpperCase()} color={color} size="small" />
          </Box>
        );
      },
    },
    {
      field: "updateStatus",
      headerName: "Update Status",
      width: 180,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height="100%" width="100%">
          <Select
            value={params.row.orderStatus}
            onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
            size="small"
            fullWidth
            disabled={
              params.row.orderStatus === "cancel" ||
              params.row.orderStatus === "delivered"
            }
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancel">Cancel</MenuItem>
          </Select>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" height="100%">
          <IconButton
            color="error"
            onClick={() => {
              if (user?.userRole !== "admin") {
                toast.error("Admins only!");
                return;
              }
              handleDelete(params.row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!user?.userEmail) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 3, px: 2 }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
      >
        Orders Management (Admin)
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box
          mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <TextField
            label="Search orders..."
            placeholder="Email, name, status"
            size="small"
            variant="outlined"
            sx={{ minWidth: 250 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="admin-status-filter-label">
              Filter by Status
            </InputLabel>
            <Select
              labelId="admin-status-filter-label"
              value={filter}
              label="Filter by Status"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancel">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ height: 600, width: "100%" }}>
          {isLoading ? (
            <TableSkeleton columns={9} rows={8} />
          ) : (
            <Box>
              <DataGrid
                rows={paginatedOrders}
                columns={columns}
                rowCount={totalItems}
                paginationMode="server"
                paginationModel={{ page, pageSize: limit }}
                onPaginationModelChange={handlePaginationChange}
                pageSizeOptions={[5, 10, 20]}
                getRowId={(row) => row._id}
                disableRowSelectionOnClick
                hideFooterPagination
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                }}
              />
              <CustomPagination
                page={page}
                total={totalItems}
                limit={limit}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Orders;
