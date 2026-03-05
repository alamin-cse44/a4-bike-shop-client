import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteCartMutation,
  useGetCartByEmailQuery,
} from "../../redux/features/cart/cartApi";
import { toast } from "sonner";
import { TCart, TResponse } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";

const Carts = ({ onClose }: { onClose?: () => void }) => {
  const user = useAppSelector(selectCurrentUser);
  const [deleteCart] = useDeleteCartMutation();
  const navigate = useNavigate();

  const { data: cartItems, isLoading } = useGetCartByEmailQuery(
    user?.userEmail,
  );

  if (isLoading)
    return <Box sx={{ p: 4, textAlign: "center" }}>Loading...</Box>;

  if (!cartItems?.data || cartItems.data.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Your cart is empty.
        </Typography>
        <Button
          component={Link}
          to="/product"
          variant="outlined"
          sx={{ mt: 2, color: "#00CA52", borderColor: "#00CA52" }}
          onClick={onClose}
        >
          Shop Now
        </Button>
      </Box>
    );
  }

  let cartPrice = cartItems?.data?.reduce(
    (acc: number, curr: any) =>
      acc + parseFloat(curr?.product?.price) * curr.quantity,
    0,
  );

  const handleDeleteCart = async (id: string) => {
    try {
      const res = (await deleteCart(id)) as TResponse<TCart>;
      if (res.error) {
        toast.error(res.error.data.message, { duration: 2000 });
      } else {
        toast.success("Cart item deleted successfully", { duration: 2000 });
      }
    } catch (error) {
      toast.error("Failed to delete cart item", { duration: 2000 });
    }
  };

  const handleOrderNow = () => {
    if (onClose) onClose();
    navigate("/checkout");
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflow: "auto", px: 1 }}>
        {cartItems.data?.map((item: TCart) => (
          <Box
            key={item._id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              mb: 1.5,
              borderRadius: "12px",
              backgroundColor: "#f9f9f9",
              transition: "0.3s",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <img
              src={item?.product?.image}
              alt={item?.product?.name}
              width="60"
              height="60"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  mb: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item?.product?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item?.quantity} × BDT {item?.product?.price}
              </Typography>
            </Box>
            <IconButton
              onClick={() => handleDeleteCart(item._id)}
              size="small"
              sx={{
                color: "error.main",
                "&:hover": { backgroundColor: "error.lighter" },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          pt: 2,
          pb: 2,
          borderTop: "1px solid #eee",
          mt: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Subtotal
          </Typography>
          <Typography variant="h6" fontWeight={700} color="#00CA52">
            BDT {cartPrice.toLocaleString()}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={handleOrderNow}
          sx={{
            backgroundColor: "#333",
            color: "#fff",
            py: 1.5,
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#000" },
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Carts;
