import ProductCard from "../../components/ProductCard";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { useState } from "react";
import { bikeBrands, bikeCategories } from "../../config/bike";

type FilterState = Record<string, string | number>;

const AllProducts = () => {
  const [params, setParams] = useState<FilterState>({
    limit: 100,
    search: "",
    sortOrder: "desc",
  });
  const { data, isLoading } = useGetAllBikesQuery(params);

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
        {isLoading ? <Skeleton width={300} /> : "Our Products"}
      </Typography>

      {isLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {Array.from(new Array(6)).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={300} />
          ))}
        </div>
      ) : (
        <>
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
                {bikeBrands.map((item) => (
                  <MenuItem value={item.brand} key={item.id}>
                    {item.brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Category Filter */}
            <FormControl sx={{ minWidth: 110 }}>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                value={params["categories"] || ""}
                onChange={(e) =>
                  handleFilterChange("categories", e.target.value)
                }
                label="Category"
              >
                <MenuItem value="">All</MenuItem>
                {bikeCategories?.map((item) => (
                  <MenuItem value={item.category} key={item.id}>
                    {item.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Price Range Filter */}
            {/* <FormControl sx={{ minWidth: 150 }}>
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
        </FormControl> */}
          </Box>

          <Grid container spacing={3}>
            {data?.data?.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {data?.data?.length === 0 && (
        <Box height={"60vh"}>No product to show!!!</Box>
      )}
    </>
  );
};

export default AllProducts;
