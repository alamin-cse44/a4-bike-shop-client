import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";

const columns = [
  { field: "_id", headerName: "ID", width: 150 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "brand", headerName: "Brand", width: 150 },
  { field: "model", headerName: "Model", width: 150 },
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
  { field: "description", headerName: "Description", flex: 2 },
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
          onClick={() => console.log("Edit", params.row._id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => console.log("Delete", params.row._id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

const TestTable = () => {
  const [page, setPage] = useState(0); // MUI uses zero-based pagination
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  // Fetch data using RTK Query
  const { data, isLoading, isError } = useGetAllBikesQuery({
    page: page + 1, // Backend expects 1-based pagination
    limit,
    search,
  });

  const handlePaginationChange = (params: {
    page: number;
    pageSize: number;
  }) => {
    setPage(params.page);
    setLimit(params.pageSize);
  };

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
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
        pageSizeOptions={[5, 10, 20]}
        loading={isLoading}
        getRowId={(row) => row._id} // ✅ Use _id as row key
      />
    </Box>
  );
};

export default TestTable;
