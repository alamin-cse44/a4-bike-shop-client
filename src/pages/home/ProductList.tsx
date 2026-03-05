import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ProductList = () => {
  const { data, isLoading } = useGetAllBikesQuery({ sortOrder: "desc" });

  const bikes = data?.data?.slice(0, 6);

  return (
    <Container maxWidth="lg">
      <Box my={12}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            mb: 6,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "#00CA52",
                fontWeight: "bold",
                letterSpacing: 2,
              }}
            >
              OUR COLLECTION
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mt: 1,
                fontSize: { xs: "28px", md: "42px" },
                color: "#1a1a1a",
              }}
            >
              {isLoading ? <Skeleton width={250} /> : "Our Featured Products"}
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 4,
                backgroundColor: "#00CA52",
                mt: 2,
                borderRadius: 2,
              }}
            />
          </Box>

          {!isLoading && (
            <Button
              component={Link}
              to="/product"
              variant="outlined"
              endIcon={<FaArrowRight />}
              sx={{
                borderColor: "#00CA52",
                color: "#00CA52",
                fontWeight: "bold",
                borderRadius: "100px",
                px: 3,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#00b548",
                  bgcolor: "rgba(0, 202, 82, 0.05)",
                },
              }}
            >
              See All
            </Button>
          )}
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {isLoading
            ? Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={400}
                    sx={{ borderRadius: "20px" }}
                  />
                </Grid>
              ))
            : bikes?.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductList;
