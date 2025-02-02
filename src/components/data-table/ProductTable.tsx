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
import {
  useDeleteBikesMutation,
  useGetAllBikesQuery,
} from "../../redux/features/bike/bikeApi";
import { toast } from "sonner";
import { TBike, TResponse } from "../../types";
import UpdateProductForm from "../UpdateProductForm";

const ProductTable = () => {
  const [page, setPage] = useState(0); 
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  // Fetch data using RTK Query
  const { data, isLoading } = useGetAllBikesQuery({
    page: page + 1, // Backend expects 1-based pagination
    limit,
    search,
    sortOrder: "desc",
  });

  // Delete functionality
  const [deleteBikes] = useDeleteBikesMutation();

  const handleDelete = (rowId: string) => {
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
            Are you sure you want to delete this item?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            {/* Confirm Button */}
            <Button
              onClick={async () => {
                await deleteRow(rowId);
                toast.dismiss(t); // Close toast after deletion
              }}
              variant="contained"
              color="error"
              sx={{ "&:hover": { backgroundColor: "error.dark" } }}
            >
              Yes, Delete
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
              No, Cancel
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

  const deleteRow = async (rowId: string) => {
    try {
      const res = (await deleteBikes(rowId)) as TResponse<TBike>;
      console.log("res", res);
      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("The Bike is Deleted successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to delete product", {
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
      headerName: "Image",
      width: 120,
      renderCell: (params: any) => (
        <img
          src={params.value}
          alt="Bike"
          style={{ width: 50, height: 50, borderRadius: 5 }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 250 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "model", headerName: "Model", width: 150 },

    // { field: "description", headerName: "Description", flex: 2 },
    { field: "price", headerName: "Price ($)", width: 120 },
    { field: "quantity", headerName: "Stock", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              console.log("Edit", params.row._id);
              setSelected(params.row._id);
              toggleDrawer();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              console.log("Delete", params.row._id);
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
        label="Search Bikes"
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
            <UpdateProductForm id={selected} />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default ProductTable;
