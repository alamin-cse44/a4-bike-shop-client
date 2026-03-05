import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Drawer,
  Fab,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import CustomPagination from "../../components/data-table/CustomPagination";
import { toast } from "sonner";
import { TResponse, TUserRegistration } from "../../types";
import {
  useDeleteSingleUserMutation,
  useGetAllUsersQuery,
} from "../../redux/features/user/userManagementApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const Users = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const user = useAppSelector(selectCurrentUser);

  // Fetch data using RTK Query
  const { data, isLoading } = useGetAllUsersQuery({
    page: 1, // Always fetch from page 1
    limit: 999, // Fetch a large number to get "all" data for manual pagination
    search,
    sortOrder: "desc",
  });

  const allUsers = data?.data || [];
  const totalItems = allUsers.length;
  const paginatedUsers = allUsers.slice(page * limit, (page + 1) * limit);

  // Delete functionality
  const [deleteSignleUser] = useDeleteSingleUserMutation();

  const handleDelete = (email: string, isBlocked: boolean) => {
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
            Are you sure you want to {isBlocked === true ? "Unblock" : "Delete"}{" "}
            this user?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            {/* Confirm Button */}
            <Button
              onClick={async () => {
                await deleteRow(email);
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
      },
    );
  };

  const deleteRow = async (email: string) => {
    try {
      const res = (await deleteSignleUser(
        email,
      )) as TResponse<TUserRegistration>;
      console.log("res", res);
      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("User Active status is updated", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to delete user", {
        duration: 2000,
      });
    }
  };

  // Update product functionality
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "isBlocked",
      headerName: "IS Blocked",
      width: 150,
      renderCell: (params: any) => (
        <>
          {params.row.isBlocked ? (
            <Button color="error" variant="outlined">
              Blocked
            </Button>
          ) : (
            <Button color="success" variant="outlined">
              Active
            </Button>
          )}
        </>
      ),
    },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: any) => (
        <>
          {/* <IconButton
            color="primary"
            onClick={() => {
              console.log("Edit", params.row._id);
              setSelected(params.row._id);
              toggleDrawer();
            }}
          >
            <EditIcon />
          </IconButton> */}
          <IconButton
            color="error"
            onClick={() => {
              if (user?.userRole !== "admin") {
                toast.error("Only admins can delete users!", {
                  duration: 2000,
                });
                return;
              }
              console.log("Delete", params.row._id);
              handleDelete(params.row.email, params.row.isBlocked);
            }}
          >
            {!params.row.isBlocked ? (
              <DeleteIcon />
            ) : (
              <PersonAddAlt1Icon sx={{ color: "green" }} />
            )}
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
      {isLoading ? (
        <TableSkeleton columns={6} rows={8} />
      ) : (
        <Box>
          <DataGrid
            rows={paginatedUsers}
            columns={columns}
            rowCount={totalItems} // ✅ Total count from backend
            paginationMode="server" // ✅ Enable server-side pagination
            paginationModel={{ page, pageSize: limit }}
            onPaginationModelChange={handlePaginationChange} // ✅ Handle pagination
            pageSizeOptions={[5, 10, 20, 50]}
            getRowId={(row) => row._id} // ✅ Use _id as row key
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

export default Users;
