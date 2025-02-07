import { Box, Button, Container, Typography, TextField } from "@mui/material";
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
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";

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

  const handleCreateOrder: SubmitHandler<FieldValues> = async (data: any) => {
    // console.log("ceheckout data", data);

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
        toast.success("Product is purchased successfully", {
          duration: 2000,
        });
        reset();
      }
    } catch (error) {
      toast.error("Failed to purchase product", {
        duration: 2000,
      });
    }
  };

  return (
    <Container>
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
        {/* Left Section */}
        <Box boxShadow={2} p={2}>
          <Typography
            variant="h6"
            py={2}
            textAlign={"center"}
            fontWeight={"bold"}
          >
            Product Item
          </Typography>
          <Box>
            <Box display={"flex"} gap={2}>
              <img
                src={productData?.data?.image}
                alt={productData?.data?.name}
                width="50"
                height="50"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
              <Box>
                <Typography variant="body2" sx={{ fontSize: "20px" }}>
                  {productData?.data?.name}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              my={2}
              textAlign={"center"}
            >
              Stock Quantity :{" "}
              <span style={{ color: "#ff5722" }}>
                {productData?.data?.quantity}
              </span>
            </Typography>
            <Typography variant="h6" fontWeight="bold" textAlign={"center"}>
              Price :{" "}
              <span style={{ color: "#ff5722" }}>
                ${productData?.data?.price.toFixed(2)}
              </span>
            </Typography>
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
          p={2}
          borderRadius={3}
          boxShadow={2}
        >
          <form onSubmit={handleSubmit(handleCreateOrder)}>
            <Typography
              variant="h6"
              py={2}
              textAlign={"center"}
              fontWeight={"bold"}
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
            {/* <TextField
              label="Payment Method Name"
              variant="outlined"
              fullWidth
              margin="normal"
              select
              {...register("paymentMethod")}
              error={!!errors.paymentMethod}
              helperText={errors.paymentMethod?.message}
            >
              <MenuItem value="">Choose payment method</MenuItem>
              <MenuItem value="Bkash">Bkash</MenuItem>
              <MenuItem value="Nagad">Nagad</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
            </TextField> */}

            <Button
              type="submit"
              sx={{ my: 2, color: "white", borderRadius: 1 }}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Confirm Order
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default SingleCheckout;
