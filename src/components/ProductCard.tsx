import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  LinearProgress,
  styled,
  IconButton,
} from "@mui/material";
import {
  FaCartPlus,
  FaFire,
  FaShoppingCart,
  FaInfoCircle,
} from "react-icons/fa";
import { TBike } from "../types";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useCreateCartMutation } from "../redux/features/cart/cartApi";
import { Link } from "react-router-dom";

const CustomLinearProgress = styled(LinearProgress)({
  height: 8,
  borderRadius: 5,
  backgroundColor: "#f0f0f0",
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor: "#00CA52",
  },
});

const ProductCard = ({ product }: { product: TBike }) => {
  const user = useAppSelector(selectCurrentUser);
  const [createCart] = useCreateCartMutation();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const discount = 25; // Placeholder
  const timeLeft = 2; // Placeholder
  const joined = 10; // Placeholder
  const maxJoined = 20; // Placeholder
  const progress = (joined / maxJoined) * 100;

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "15px",
        overflow: "hidden",
        border: "1px solid #eee",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Badges */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          display: "flex",
          gap: 1,
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            background: "#FF3D00",
            color: "white",
            px: 1,
            py: 0.2,
            borderRadius: "5px",
            fontSize: "0.75rem",
            fontWeight: "bold",
          }}
        >
          {discount}% OFF
        </Typography>
        <Typography
          sx={{
            background: "#FF9100",
            color: "white",
            px: 1,
            py: 0.2,
            borderRadius: "5px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {timeLeft} days left
        </Typography>
      </Box>

      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="220"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ p: 2, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 1,
              mb: 1,
            }}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              fontWeight="bold"
              sx={{
                height: "48px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                fontSize: "0.95rem",
                lineHeight: 1.3,
                flexGrow: 1,
              }}
            >
              {product.name}
            </Typography>
            <IconButton
              onClick={handleAddToCart}
              sx={{
                color: "#00CA52",
                border: "1px solid #00CA52",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "#00CA52",
                  color: "white",
                },
              }}
            >
              <FaCartPlus style={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}
          >
            <Rating
              name="read-only"
              value={4.5}
              readOnly
              precision={0.5}
              size="small"
            />
            <Typography variant="caption" color="text.secondary">
              (4.5)
            </Typography>
          </Box>

          {/* Progress Bar Area */}
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <FaFire color="#FF3D00" /> {joined}/{maxJoined} joined
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight="bold"
              >
                (Max: 300) {progress}%
              </Typography>
            </Box>
            <CustomLinearProgress variant="determinate" value={progress} />
          </Box>

          {/* Price Area */}
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
            <Typography
              variant="subtitle2"
              component="span"
              fontWeight="bold"
              color="#666"
            >
              মূল্য:
            </Typography>
            <Typography
              variant="h6"
              component="span"
              sx={{ color: "#00CA52", fontWeight: "bold" }}
            >
              {product.price} ৳
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {Math.round(product.price * 1.25)} ৳
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#00CA52",
              color: "white",
              borderRadius: "8px",
              textTransform: "none",
              py: 1,
              fontWeight: "bold",
              gap: 1,
              "&:hover": {
                backgroundColor: "#00b548",
              },
            }}
          >
            <FaInfoCircle /> View Details
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
