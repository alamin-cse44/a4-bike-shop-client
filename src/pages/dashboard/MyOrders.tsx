import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
} from "@mui/material";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import CustomPagination from "../../components/data-table/CustomPagination";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useCreatePaymentMutation,
  useGetOrdersByEmailQuery,
} from "../../redux/features/order/orderApi";
import { TOrder } from "../../types";

const MyOrders = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const user = useAppSelector(selectCurrentUser);
  const [createPayment] = useCreatePaymentMutation();

  // Fetch data using RTK Query
  const { data, isLoading } = useGetOrdersByEmailQuery({
    page: 1, // Always fetch from page 1
    limit: 999, // Fetch a large number to get "all" data for manual pagination
    orderStatus: filter,
    sortOrder: "desc",
  });

  const allOrders = data?.data || [];
  const totalItems = allOrders.length;
  const paginatedOrders = allOrders.slice(page * limit, (page + 1) * limit);

  const handlePaginationChange = (params: {
    page: number;
    pageSize: number;
  }) => {
    setPage(params.page);
    setLimit(params.pageSize);
  };

  const handlePayment = async (rowData: TOrder) => {
    const res = await createPayment(rowData);
    if (res?.data?.data) {
      window.open(res?.data?.data, "_blank");
    } else {
      toast.error("Failed to create payment", {
        duration: 2000,
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "Order ID", width: 215 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 250,
      renderCell: (params) => {
        const status = params.row.paymentStatus;
        if (status === "pending") {
          return (
            <Box display="flex" alignItems="center" gap={1} height="100%">
              <Chip label="Unpaid" color="error" size="small" />
              <Button
                onClick={() => handlePayment(params.row)}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Pay Now
              </Button>
            </Box>
          );
        }
        return (
          <Box display="flex" alignItems="center" height="100%">
            <Chip label="PAID" color="success" size="small" variant="filled" />
          </Box>
        );
      },
    },
    {
      field: "image",
      headerName: "Product",
      width: 120,
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
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
      headerName: "Customer Name",
      width: 150,
      valueGetter: (_value, row) => row.customer?.name,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 120,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let color: "primary" | "secondary" | "success" | "error" | "warning" =
          "primary";

        switch (status) {
          case "pending":
            color = "warning";
            break;
          case "confirmed":
            color = "primary";
            break;
          case "delivered":
            color = "success";
            break;
          case "cancelled":
          case "cancel":
            color = "error";
            break;
        }

        return (
          <Box display="flex" alignItems="center" height="100%">
            <Chip
              label={status.toUpperCase()}
              color={color}
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          </Box>
        );
      },
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
        My Orders
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box mb={3} display="flex" justifyContent="flex-end">
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="status-filter-label">Filter by Status</InputLabel>
            <Select
              labelId="status-filter-label"
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
            <TableSkeleton columns={7} rows={8} />
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

export default MyOrders;
