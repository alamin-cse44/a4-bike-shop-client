import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ position: "relative", height: "380px" }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
              ${product.originalPrice}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="" alignItems="center">
            <Rating
              name="read-only"
              value={product.rating}
              readOnly
              precision={0.1}
              sx={{ fontSize: "20px" }}
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
              {product.rating}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            background: "red",
            pl: 1.5,
            borderRadius: 5,
            width: "30%",
            position: "absolute",
            top: "10px",
            color: "white",
          }}
          variant="body2"
        >
          {product.discount}% OFF
        </Typography>

        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            width: "90%",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ color: "white" }}
            startIcon={<FaCartPlus color="white" />}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
