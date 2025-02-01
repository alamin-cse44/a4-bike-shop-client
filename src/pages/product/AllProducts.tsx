import ProductCard from "../../components/ProductCard";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { useState } from "react";

type FilterState = Record<string, string | number>;

const AllProducts = () => {
  const [params, setParams] = useState<FilterState>({ limit: 100, search: "" });
  const { data } = useGetAllBikesQuery(params);

  const handleFilterChange = (
    filterName: string,
    filterValue: string | number
  ) => {
    setParams((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          my: 5,
          fontSize: { xs: "18px", md: "35px" },
        }}
      >
        Our Products
      </Typography>
      {!data?.data && <Box height={"90vh"}>Loading...</Box>}

      {/* Filter Section */}
      <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/* searching */}
        <TextField
          sx={{ minWidth: 200 }}
          label="Search by name"
          variant="outlined"
          value={params["search"] ?? ""}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
        {/* Brand Filter */}
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel id="brand-filter-label">Brand</InputLabel>
          <Select
            labelId="brand-filter-label"
            value={params["brand"] || ""}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            label="Brand"
          >
            <MenuItem value="">All</MenuItem>
            {data?.data?.map((product) => (
              <MenuItem value={product?.brand} key={product._id}>
                {product?.brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Model Filter */}
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel id="model-filter-label">Model</InputLabel>
          <Select
            labelId="model-filter-label"
            value={params["model"] || ""}
            onChange={(e) => handleFilterChange("model", e.target.value)}
            label="Model"
          >
            <MenuItem value="">All</MenuItem>
            {data?.data?.map((product) => (
              <MenuItem value={product?.model} key={product._id}>
                {product?.model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Range Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="price-filter-label">Price Range</InputLabel>
          <Select
            labelId="price-filter-label"
            value={params["priceRange"] || ""}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
            label="Price Range"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="0-50">$0 - $50</MenuItem>
            <MenuItem value="51-100">$51 - $100</MenuItem>
            <MenuItem value="101-200">$101 - $200</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {data?.data?.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllProducts;
