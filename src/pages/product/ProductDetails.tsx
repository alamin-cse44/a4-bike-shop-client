import { Box, Button, Container, Skeleton, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetSignleBikeQuery } from "../../redux/features/bike/bikeApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateCartMutation } from "../../redux/features/cart/cartApi";
import { toast } from "sonner";
import { FaCartPlus } from "react-icons/fa";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSignleBikeQuery(id);

  const user = useAppSelector(selectCurrentUser);
  const [createCart] = useCreateCartMutation();

  const handleAddToCart = async () => {
    if (user) {
      const cartInfo = {
        userEmail: user?.userEmail,
        product: data?.data?._id,
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

  return (
    <Container>
      {/* <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          my: 5,
          fontSize: { xs: "18px", md: "35px" },
        }}
      >
        {isLoading ? (
          <Skeleton width={400} />
        ) : (
          `Details of ${data?.data?.name}`
        )}
      </Typography> */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            p: 4,
            gap: 4,
          }}
        >
          <Skeleton width={"100%"} height={400} />
          <Skeleton width={"100%"} height={400} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            // p: 4,
            my: 5,
            gap: 4,
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "left" },
              color: "#1a1a1a",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#333" }}
            >
              {data?.data?.name}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="medium"
              gutterBottom
              sx={{ color: "#666" }}
            >
              Brand - {data?.data?.brand}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="medium"
              gutterBottom
              sx={{ color: "#666" }}
            >
              Model - {data?.data?.model}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="medium"
              gutterBottom
              sx={{ color: "#666" }}
            >
              Category - {data?.data?.categories}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                lineHeight: 1.6,
                fontSize: "1rem",
                color: "#555",
                marginBottom: "1.5rem",
              }}
            >
              Experience unmatched comfort and style with{" "}
              <span style={{ color: "#ff5722" }}>{data?.data?.name}</span> .
              Designed for performance, this premium footwear combines
              cutting-edge technology with a sleek, modern look, making it
              perfect for both athletes and trendsetters.
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "", marginBottom: "1.5rem" }}
            >
              Stock Quantity - {data?.data?.quantity}
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "", marginBottom: "1.5rem" }}
            >
              Price - ${data?.data?.price.toFixed(2)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                onClick={handleAddToCart}
                variant="outlined"
                color="primary"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: "primary",
                  // color: "#ff5722",
                  color: "primary",
                  "&:hover": {
                    borderColor: "#e64a19",
                    color: "#e64a19",
                  },
                }}
                startIcon={<FaCartPlus color="" />}
              >
                Add to Cart
              </Button>
              <Button
                component={Link}
                to={`/single-checkout/${data?.data?._id}`}
                variant="contained"
                color="primary"
                sx={{
                  px: 4,
                  py: 1.5,
                  color: "white",
                  backgroundColor: "primary",
                  // "&:hover": { backgroundColor: "#e64a19" },
                }}
              >
                BUY NOW
              </Button>
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={data?.data?.image}
              alt="Fitness"
              sx={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                borderRadius: "16px",
                boxShadow: 3,
              }}
            />
          </Box>
        </Box>
      )}

      {!isLoading && <RelatedProducts categories={data?.data?.categories} />}
    </Container>
  );
};

export default ProductDetails;
