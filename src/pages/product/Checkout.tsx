import {
  Box,
  Container,
  IconButton,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteCartMutation,
  useGetCartByEmailQuery,
} from "../../redux/features/cart/cartApi";
import { toast } from "sonner";
import { TCart, TResponse } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InfoIcon from "@mui/icons-material/Info";

const Checkout = () => {
  const user = useAppSelector(selectCurrentUser);
  const [deleteCart] = useDeleteCartMutation();

  const { data: cartItems, isLoading } = useGetCartByEmailQuery(
    user?.userEmail,
  );

  if (isLoading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography>Loading checkout details...</Typography>
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
        toast.success("Cart item removed", { duration: 2000 });
      }
    } catch (error) {
      toast.error("Failed to remove item", { duration: 2000 });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fbfcfd",
        minHeight: "80vh",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{ color: "#1a1a1a" }}
          >
            Checkout
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review your items and complete your purchase.
          </Typography>
        </Box>

        {cartItems?.data?.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: "center",
              borderRadius: "20px",
              border: "1px dashed #ccc",
            }}
          >
            <ShoppingBagIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
            <Typography variant="h5" fontWeight={600} color="text.secondary">
              Your cart is empty
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Left Section: Product Items */}
            <Grid item xs={12} md={7}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}
              >
                <ShoppingBagIcon sx={{ color: "#00CA52" }} />
                Product Items ({cartItems.data.length})
              </Typography>

              <Stack spacing={2}>
                {cartItems?.data?.map((item: TCart) => (
                  <Card
                    key={item._id}
                    elevation={0}
                    sx={{
                      borderRadius: "16px",
                      border: "1px solid #edf2f7",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "#00CA52",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <img
                          src={item?.product?.image}
                          alt={item?.product?.name}
                          width="80"
                          height="80"
                          style={{ borderRadius: "12px", objectFit: "cover" }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            sx={{ mb: 0.5 }}
                          >
                            {item?.product?.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <span style={{ fontWeight: 600, color: "#00CA52" }}>
                              BDT {item?.product?.price}
                            </span>
                            <span
                              style={{ fontSize: "0.8rem", color: "#a0aec0" }}
                            >
                              |
                            </span>
                            <span>Qty: {item?.quantity}</span>
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() => handleDeleteCart(item._id)}
                          sx={{
                            color: "#e53e3e",
                            backgroundColor: "#fff5f5",
                            "&:hover": { backgroundColor: "#fed7d7" },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>

              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  border: "1px solid #edf2f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Total Amount
                </Typography>
                <Typography variant="h5" fontWeight={800} color="#00CA52">
                  BDT {cartPrice.toLocaleString()}
                </Typography>
              </Box>
            </Grid>

            {/* Right Section: Informational Message */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "20px",
                  backgroundColor: "#fff",
                  border: "1px solid #edf2f7",
                  position: "sticky",
                  top: 100,
                }}
              >
                <Alert
                  severity="info"
                  icon={<InfoIcon sx={{ color: "#3182ce" }} />}
                  sx={{
                    backgroundColor: "#ebf8ff",
                    color: "#2c5282",
                    borderRadius: "12px",
                    "& .MuiAlert-icon": { pt: 0.5 },
                  }}
                >
                  <AlertTitle sx={{ fontWeight: 700, mb: 1.5 }}>
                    Order Information
                  </AlertTitle>
                  <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
                    This checkout functionality for multiple cart items is
                    currently under development.
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    To place an order now, please go to a{" "}
                    <strong>Product's Detail Page</strong> and use the{" "}
                    <strong>Buy Now</strong> button.
                  </Typography>
                </Alert>

                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    What can I do here?
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      pl: 2,
                      borderLeft: "2px solid #edf2f7",
                      color: "#4a5568",
                    }}
                  >
                    • Review your selected items
                    <br />
                    • Remove items you no longer want
                    <br />• Calculate total price
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Checkout;
