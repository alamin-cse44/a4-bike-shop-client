import ProductCard from "../../components/ProductCard";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Skeleton,
  Slider,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { useEffect, useState } from "react";
import { bikeBrands, bikeCategories } from "../../config/bike";
import { useSearchParams } from "react-router-dom";

type FilterState = Record<string, string | number | boolean | undefined>;

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);

  const search = searchParams.get("search") || "";

  const params: FilterState = {
    limit: 100,
    search: search || undefined,
    sortOrder: "desc",
    categories:
      selectedCategories.length > 0 ? selectedCategories.join(",") : undefined,
    brand: selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 200000 ? priceRange[1] : undefined,
  };

  const { data, isLoading } = useGetAllBikesQuery(params);

  useEffect(() => {
    const urlCategories = searchParams.get("categories");
    if (urlCategories) {
      setSelectedCategories(urlCategories.split(","));
    }
  }, [searchParams]);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleToggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
  };

  const handleToggleBrand = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStock(false);
    setSearchParams({});
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Sidebar Filter */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={0}
            sx={{ p: 3, border: "1px solid #eee", borderRadius: "12px" }}
          >
            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Price Range
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Min
                  </Typography>
                  <Paper variant="outlined" sx={{ px: 1, py: 0.5 }}>
                    <Typography variant="body2">{priceRange[0]} ৳</Typography>
                  </Paper>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", pt: 2 }}>
                  —
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Max
                  </Typography>
                  <Paper variant="outlined" sx={{ px: 1, py: 0.5 }}>
                    <Typography variant="body2">{priceRange[1]} ৳</Typography>
                  </Paper>
                </Box>
              </Box>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={200000}
                sx={{ color: "#00CA52" }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Product Categories
              </Typography>
              <FormGroup>
                {bikeCategories.map((cat) => (
                  <FormControlLabel
                    key={cat.id}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(cat.category)}
                        onChange={() => handleToggleCategory(cat.category)}
                        sx={{
                          color: "#00CA52",
                          "&.Mui-checked": { color: "#00CA52" },
                        }}
                      />
                    }
                    label={cat.category}
                    sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                  />
                ))}
              </FormGroup>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Filter by Brands
              </Typography>
              <FormGroup>
                {bikeBrands.map((brand) => (
                  <FormControlLabel
                    key={brand.id}
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand.brand)}
                        onChange={() => handleToggleBrand(brand.brand)}
                        sx={{
                          color: "#00CA52",
                          "&.Mui-checked": { color: "#00CA52" },
                        }}
                      />
                    }
                    label={brand.brand}
                    sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                  />
                ))}
              </FormGroup>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box mb={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Product Status
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      sx={{
                        color: "#00CA52",
                        "&.Mui-checked": { color: "#00CA52" },
                      }}
                    />
                  }
                  label="In Stock"
                  sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#00CA52",
                        "&.Mui-checked": { color: "#00CA52" },
                      }}
                    />
                  }
                  label="On Sale"
                  sx={{ "& .MuiTypography-root": { fontSize: "0.9rem" } }}
                />
              </FormGroup>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearFilters}
              sx={{
                borderColor: "#eee",
                color: "#666",
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { borderColor: "#00CA52", color: "#00CA52" },
              }}
            >
              Clear all filters
            </Button>
          </Paper>
        </Grid>

        {/* Product Grid */}
        <Grid item xs={12} md={9}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" fontWeight="bold">
              {search ? `Search results for "${search}"` : "Our Products"}
              <Typography
                variant="body2"
                color="text.secondary"
                component="span"
                sx={{ ml: 2, fontWeight: "normal" }}
              >
                ({data?.data?.length || 0} items found)
              </Typography>
            </Typography>
          </Box>

          {isLoading ? (
            <Grid container spacing={3}>
              {Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={350}
                    sx={{ borderRadius: "12px" }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              {data?.data?.length === 0 ? (
                <Box sx={{ py: 10, textAlign: "center" }}>
                  <Typography variant="h6" color="text.secondary">
                    No products found matching your filters.
                  </Typography>
                  <Button
                    sx={{ mt: 2, color: "#00CA52" }}
                    onClick={handleClearFilters}
                  >
                    Clear all filters
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {data?.data?.map((product) => (
                    <Grid item xs={12} sm={6} lg={4} key={product._id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AllProducts;
