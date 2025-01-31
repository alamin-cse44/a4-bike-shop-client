import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { FaCartPlus, FaJediOrder } from "react-icons/fa";
import { TBike } from "../types";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useCreateCartMutation } from "../redux/features/cart/cartApi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: TBike }) => {
  const user = useAppSelector(selectCurrentUser);
  const [createCart] = useCreateCartMutation();

  const handleAddToCart = async () => {
    if (user) {
      const cartInfo = {
        userEmail: user?.userEmail,
        product: product?._id,
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
    <Card sx={{ position: "relative", height: "380px" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <Typography gutterBottom variant="body1">
            {product.name}
          </Typography>
          <Button
            onClick={handleAddToCart}
            sx={{
              background: "white",
              borderRadius: 5,
            }}
            variant="outlined"
          >
            <FaCartPlus color="black" size={20} />
          </Button>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" justifyContent="" alignItems="center">
            <Typography
              sx={{ fontWeight: "bold", mr: 0.5, fontSize: "20px" }}
              variant="h5"
              component="div"
            >
              ${product.price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textDecoration: "line-through" }}
            >
              {/* {product?.originalPrice} */}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="" alignItems="center">
            <Rating
              name="read-only"
              value={4.5}
              readOnly
              precision={0.1}
              sx={{ fontSize: "20px", color: "#FCD800" }}
            />
            <Typography
              sx={{
                background: "yellow",
                borderRadius: 2,
                px: 1,
                ml: 1,
                top: "10px",
              }}
            >
              4.8
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            background: "red",
            pl: 1.5,
            borderRadius: 5,
            width: "20%",
            position: "absolute",
            top: "10px",
            color: "white",
          }}
          variant="body2"
        >
          {/* {product.discount}% OFF */}
          New
        </Typography>

        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            width: "90%",
          }}
        >
          <Button
            component={Link}
            to={`/product/${product._id}`}
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ color: "white" }}
            startIcon={<FaJediOrder color="white" />}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
