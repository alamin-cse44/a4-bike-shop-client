import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Divider,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetSignleBikeQuery } from "../../redux/features/bike/bikeApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateCartMutation } from "../../redux/features/cart/cartApi";
import { toast } from "sonner";
import { FaCartPlus, FaTruck, FaUndo, FaShieldAlt } from "react-icons/fa";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSignleBikeQuery(id);
  const product = data?.data;

  const user = useAppSelector(selectCurrentUser);
  const [createCart] = useCreateCartMutation();

  const handleAddToCart = async () => {
    if (user) {
      const cartInfo = {
        userEmail: user?.userEmail,
        product: product?._id,
        quantity: 1,
      };
      const res = await createCart(cartInfo);
      console.log("Cart created", res);
      toast.success("Product added to cart", {
        position: "top-right",
      });
    } else {
      toast.error("Please log in to add product to cart", {
        position: "top-center",
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Skeleton variant="text" width={200} height={30} sx={{ mb: 4 }} />
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Skeleton
              variant="rectangular"
              height={500}
              sx={{ borderRadius: "16px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} width="80%" />
            <Skeleton variant="text" height={40} width="40%" />
            <Skeleton variant="text" height={100} width="100%" sx={{ my: 4 }} />
            <Skeleton
              variant="rectangular"
              height={50}
              width="100%"
              sx={{ mb: 2 }}
            />
            <Skeleton variant="rectangular" height={50} width="100%" />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <MuiLink
          component={Link}
          to="/"
          underline="hover"
          color="inherit"
          sx={{ fontSize: "0.875rem" }}
        >
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          to="/product"
          underline="hover"
          color="inherit"
          sx={{ fontSize: "0.875rem" }}
        >
          Shop
        </MuiLink>
        <Typography color="text.primary" sx={{ fontSize: "0.875rem" }}>
          {product?.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={6}>
        {/* Left: Product Image */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              border: "1px solid #eee",
              borderRadius: "16px",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              component="img"
              src={product?.image}
              alt={product?.name}
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "500px",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
            {product?.quantity > 0 && (
              <Chip
                label="In Stock"
                color="success"
                size="small"
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  backgroundColor: "#00CA52",
                }}
              />
            )}
          </Paper>
        </Grid>

        {/* Right: Product Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="overline"
              color="#00CA52"
              fontWeight="bold"
              sx={{ letterSpacing: 1.2 }}
            >
              {product?.brand}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
            >
              {product?.name}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Typography variant="h4" fontWeight="bold" color="#00CA52">
                {product?.price} ৳
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textDecoration: "line-through", opacity: 0.6 }}
              >
                {Math.round(product?.price * 1.15)} ৳
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8, mb: 4 }}
            >
              Experience elite performance and unmatched style with the{" "}
              {product?.name}. Whether you're hitting the city streets or
              exploring rugged terrains, this masterpiece from {product?.brand}{" "}
              is designed to deliver excellence in every mile.
            </Typography>

            {/* Specifications */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
                mb: 4,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Brand
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {product?.brand}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {product?.categories}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Model
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {product?.model}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Availability
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color={
                      product?.quantity > 0 ? "success.main" : "error.main"
                    }
                  >
                    {product?.quantity > 0
                      ? `${product.quantity} Units left`
                      : "Out of Stock"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Actions */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Button
                fullWidth
                onClick={handleAddToCart}
                variant="outlined"
                startIcon={<FaCartPlus />}
                sx={{
                  py: 1.5,
                  borderRadius: "8px",
                  borderColor: "#00CA52",
                  color: "#00CA52",
                  fontWeight: "bold",
                  "&:hover": {
                    borderColor: "#008f3a",
                    backgroundColor: "#f0fff4",
                  },
                }}
              >
                Add to Cart
              </Button>
              <Button
                fullWidth
                component={Link}
                to={`/single-checkout/${product?._id}`}
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: "8px",
                  backgroundColor: "#00CA52",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#008f3a" },
                }}
              >
                Buy Now
              </Button>
            </Stack>

            {/* Trust Badges */}
            <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <FaTruck size={24} color="#666" style={{ marginBottom: 4 }} />
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Free Shipping
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <FaUndo size={24} color="#666" style={{ marginBottom: 4 }} />
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  7 Days Return
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <FaShieldAlt
                  size={24}
                  color="#666"
                  style={{ marginBottom: 4 }}
                />
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Secure Warranty
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Description Section */}
      <Box sx={{ mt: 8, mb: 10 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Detailed Description
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ letterSpacing: 0.5, lineHeight: 2 }}
        >
          Discover the perfect blend of engineering and aesthetics. The{" "}
          {product?.name} is built for riders who demand more. Featuring a
          reinforced chassis, efficient fuel consumption, and state-of-the-art
          safety mechanisms, it ensures your journey is as enjoyable as the
          destination. Powered by {product?.brand}'s legacy in the biking
          industry, this model represents the pinnacle of its category. Ideal
          for both daily commutes and weekend adventures.
        </Typography>
      </Box>

      {/* Related Products */}
      {!isLoading && <RelatedProducts categories={product?.categories} />}
    </Container>
  );
};

export default ProductDetails;
