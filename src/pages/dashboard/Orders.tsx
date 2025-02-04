import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Fab,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { toast } from "sonner";
import { TOrder, TResponse } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../redux/features/order/orderApi";

const Orders = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const user = useAppSelector(selectCurrentUser);

  // Fetch data using RTK Query
  const { data, isLoading } = useGetAllOrdersQuery({
    page: page + 1, // Backend expects 1-based pagination
    limit,
    search,
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

  // Update product functionality
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState("");

  // Toggle cart drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
      field: "orderStatus",
      headerName: "Order Status",
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
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              // console.log("Edit", params.row._id);
              // setSelected(params.row._id);
              toggleDrawer();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              if (user?.userRole !== "admin") {
                toast.error("Only admins can delete users!", {
                  duration: 2000,
                });
                return;
              }
              // console.log("Delete", params.row._id);
              handleDelete(params.row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", mt: 2 }}>
      {/* 🔍 Search Input */}
      <TextField
        label="Search User"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
      {drawerOpen && (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 350, padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 8,
              }}
            >
              <Typography variant="h6">Update Your Product</Typography>
              <Fab
                onClick={toggleDrawer}
                size="small"
                color="secondary"
                aria-label="add"
              >
                <CloseIcon />
              </Fab>
            </Box>
            {/* <UpdateProductForm id={selected} /> */}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Orders;
