import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Divider,
  Paper,
  Stack,
  Avatar,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { TOrder, TResponse } from "../../types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useGetSignleBikeQuery } from "../../redux/features/bike/bikeApi";
import { useGetSignleUserQuery } from "../../redux/features/user/userManagementApi";
import {
  useCreateOrderMutation,
  useCreatePaymentMutation,
} from "../../redux/features/order/orderApi";
import { FaShieldAlt, FaTruck, FaLock } from "react-icons/fa";

const validationSchema = Yup.object().shape({
  address: Yup.string().required("Shipping address is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Must be a valid phone number"),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer"),
});

const SingleCheckout = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetSignleUserQuery(user?.userEmail);
  const { id } = useParams();
  const { data: productData, isLoading: productLoading } =
    useGetSignleBikeQuery(id);
  const [createPayment] = useCreatePaymentMutation();
  const [createOrder] = useCreateOrderMutation();

  const product = productData?.data;

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = watch("quantity") || 1;
  const totalPrice = (product?.price || 0) * quantity;

  const handleCreateOrder: SubmitHandler<FieldValues> = async (data: any) => {
    if (!user) {
      toast.error("Please log in to continue");
      return;
    }

    const orderInfo = {
      email: user?.userEmail,
      customer: userData?.data?._id,
      product: product?._id,
      totalPrice: totalPrice,
      quantity: data.quantity,
      address: data.address,
      phone: data.phone,
      orderStatus: "pending",
      paymentStatus: "pending",
      paymentMethod: "",
      transactionId: "",
    };

    try {
      const res = (await createOrder(orderInfo)) as TResponse<TOrder>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.custom(
          (t) => (
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                border: "1px solid #00CA52",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="#00CA52"
              >
                Order Placed Successfully!
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Thank you for your order. Please complete the payment to
                finalize.
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  onClick={async () => {
                    const payment = res?.data;
                    await handlePayment(payment);
                  }}
                  variant="contained"
                  sx={{
                    backgroundColor: "#00CA52",
                    "&:hover": { backgroundColor: "#00b548" },
                  }}
                >
                  Pay Now
                </Button>
                <Button variant="outlined" onClick={() => toast.dismiss(t)}>
                  Later
                </Button>
              </Stack>
            </Paper>
          ),
          { position: "top-center", duration: 10000 },
        );
        reset();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const handlePayment = async (data: any) => {
    const res = await createPayment(data?.data);
    if (res?.data?.data) {
      window.location.href = res.data.data;
    } else {
      toast.error("Payment failed to initialize");
    }
  };

  if (productLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, height: 400 }}>
              <Stack spacing={2}>
                <Box height={40} bgcolor="#f0f0f0" />
                <Box height={300} bgcolor="#f0f0f0" />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, height: 400 }}>
              <Stack spacing={2}>
                <Box height={40} bgcolor="#f0f0f0" />
                <Box height={300} bgcolor="#f0f0f0" />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <MuiLink component={Link} to="/" underline="hover" color="inherit">
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          to={`/product/${id}`}
          underline="hover"
          color="inherit"
        >
          Product Details
        </MuiLink>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight="bold" mb={4}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Left: Billing/Shipping Details */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{ p: 4, border: "1px solid #eee", borderRadius: "16px" }}
          >
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Shipping Information
            </Typography>
            <form onSubmit={handleSubmit(handleCreateOrder)}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body2" fontWeight="medium" mb={1}>
                    Full Name (from profile)
                  </Typography>
                  <TextField
                    fullWidth
                    value={userData?.data?.name || "Guest User"}
                    disabled
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="medium" mb={1}>
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    value={user?.userEmail || ""}
                    disabled
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight="medium" mb={1}>
                    Shipping Address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your street address, city, postcode"
                    multiline
                    rows={3}
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" fontWeight="medium" mb={1}>
                      Phone Number
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="e.g. 01712345678"
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" fontWeight="medium" mb={1}>
                      Order Quantity
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      {...register("quantity")}
                      error={!!errors.quantity}
                      helperText={errors.quantity?.message}
                    />
                  </Grid>
                </Grid>

                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 2,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      backgroundColor: "#00CA52",
                      borderRadius: "10px",
                      "&:hover": { backgroundColor: "#00b548" },
                      textTransform: "none",
                    }}
                  >
                    Confirm & Proceed to Payment
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>

          <Stack direction="row" spacing={4} sx={{ mt: 4, opacity: 0.7 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FaShieldAlt color="#00CA52" />
              <Typography variant="caption">Secure Transaction</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <FaTruck color="#00CA52" />
              <Typography variant="caption">Safe Delivery</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <FaLock color="#00CA52" />
              <Typography variant="caption">Data Privacy</Typography>
            </Stack>
          </Stack>
        </Grid>

        {/* Right: Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: "1px solid #eee",
              borderRadius: "16px",
              backgroundColor: "#fafafa",
              position: "sticky",
              top: 20,
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Order Summary
            </Typography>

            <Stack spacing={3}>
              <Box display="flex" gap={2}>
                <Avatar
                  variant="rounded"
                  src={product?.image}
                  sx={{ width: 80, height: 80, border: "1px solid #eee" }}
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {product?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Brand: {product?.brand}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {product?.price} ৳ x {quantity}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Stack spacing={1.5}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {totalPrice} ৳
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Shipping Fee
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    FREE
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Tax (VAT 0%)
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    0 ৳
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Amount
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="#00CA52">
                  {totalPrice} ৳
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  border: "1px dashed #00CA52",
                }}
              >
                <Typography
                  variant="caption"
                  color="#00CA52"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <FaTruck /> Your bike will be delivered within 3-5 business
                  days.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleCheckout;
