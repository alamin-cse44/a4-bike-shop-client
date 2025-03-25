import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Divider,
} from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { TOrder, TResponse } from "../../types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useGetSignleBikeQuery } from "../../redux/features/bike/bikeApi";
import { useGetSignleUserQuery } from "../../redux/features/user/userManagementApi";
import {
  useCreateOrderMutation,
  useCreatePaymentMutation,
} from "../../redux/features/order/orderApi";

const validationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  phone: Yup.number().required("Phone number is required"),
  quantity: Yup.number().required("Quantity is required").positive(),
  // paymentMethod: Yup.string().required("Provide your own payment method"),
});

const SingleCheckout = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetSignleUserQuery(user?.userEmail);
  const { id } = useParams();
  const { data: productData } = useGetSignleBikeQuery(id);
  const [createPayment] = useCreatePaymentMutation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const [createOrder] = useCreateOrderMutation();

  if (!user) {
    toast.error("Please log in to buy product!!!", {
      position: "top-center",
      // duration: 2000,
    });
  }

  const handleCreateOrder: SubmitHandler<FieldValues> = async (data: any) => {
    const orderInfo = {
      email: user?.userEmail,
      customer: userData?.data?._id,
      product: productData?.data?._id,
      totalPrice: 0,
      quantity: data.quantity,
      address: data.address,
      phone: data.phone,
      orderStatus: "pending",
      paymentStatus: "pending",
      paymentMethod: "",
      transactionId: "",
    };
    console.log("order info", orderInfo);
    try {
      const res = (await createOrder(orderInfo)) as TResponse<TOrder>;
      console.log("res", res);
      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        // toast.success("Product is purchased successfully", {
        //   duration: 2000,
        // });
        toast.custom(
          (t) => (
            <Box
              sx={{
                backgroundColor: "white",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "medium", color: "black" }}
              >
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Product is purchased successfully!
                </span>{" "}
                <br /> Please pay your Payment, otherwise, go to the dashboard My Order section!
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                {/* Confirm Button */}
                <Button
                  onClick={async () => {
                    const payment = res?.data;
                    await handlePayment(payment);
                  }}
                  variant="contained"
                  color="success"
                  sx={{ "&:hover": { backgroundColor: "green" } }}
                >
                  PAY
                </Button>

                {/* Cancel Button */}
                <Button
                  onClick={() => {
                    toast.dismiss(t);
                  }}
                  variant="outlined"
                  sx={{
                    borderColor: "grey.300",
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: "grey.400",
                      backgroundColor: "grey.100",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ),
          {
            position: "top-center",
            duration: 20000,
          }
        );
        reset();
      }
    } catch (error) {
      toast.error("Failed to purchase product", {
        duration: 2000,
      });
    }
  };

  const handlePayment = async (data: any) => {
    console.log("row data", data);

    const res = await createPayment(data?.data);
    console.log("res", res);
    if (res?.data?.data) {
      window.open(res?.data?.data, "_blank");
    } else {
      toast.error("Failed to create payment", {
        duration: 2000,
      });
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Section (Product Details) - 5 Columns */}
        <Grid item xs={12} md={5}>
          <Box boxShadow={3} p={3} borderRadius={2}>
            <Typography
              variant="h6"
              py={2}
              textAlign="center"
              fontWeight="bold"
            >
              Product Item
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
              gap={2}
            >
              <img
                src={productData?.data?.image}
                alt={productData?.data?.name}
                width="60"
                height="60"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
              <Typography variant="h6">{productData?.data?.name}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
              gap={2}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                my={2}
                textAlign="center"
              >
                Stock Quantity:{" "}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                my={1}
                textAlign="center"
              >
                <span style={{ color: "#ff5722" }}>
                  {productData?.data?.quantity}
                </span>
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
              gap={2}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                my={2}
                textAlign="center"
              >
                Price:{" "}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                my={1}
                textAlign="center"
              >
                <span style={{ color: "#ff5722" }}>
                  ${productData?.data?.price.toFixed(2)}
                </span>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Section (Checkout Form) - 7 Columns */}
        <Grid item xs={12} md={7}>
          <Box p={3} borderRadius={3} boxShadow={3}>
            <form onSubmit={handleSubmit(handleCreateOrder)}>
              <Typography
                variant="h6"
                py={2}
                textAlign="center"
                fontWeight="bold"
              >
                Checkout Information
              </Typography>

              <TextField
                label="Shipping Address"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />

              <TextField
                type="number"
                label="Phone Number"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />

              <TextField
                type="number"
                label="Bike Quantity"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("quantity")}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />

              <Button
                type="submit"
                sx={{ mt: 3, color: "white", borderRadius: 1 }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Confirm Order
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleCheckout;
