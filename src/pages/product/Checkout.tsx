import {
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Typography,
  TextField,
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Bike name is required"),
  brand: Yup.string().required("Brand name is required"),
  model: Yup.string().required("Model name is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  description: Yup.string(),
  // type: Yup.string().required("User type is required"),
  image: Yup.mixed().required("Image is required"),
});

const Checkout = () => {
  const user = useAppSelector(selectCurrentUser);
  const [deleteCart] = useDeleteCartMutation();

  const { data: cartItems } = useGetCartByEmailQuery(user?.userEmail);

  let cartPrice = cartItems?.data?.reduce(
    (acc: number, curr: any) => acc + parseFloat(curr?.product?.price),
    0
  );

  const handleDeleteCart = async (id: string) => {
    try {
      const res = (await deleteCart(id)) as TResponse<TCart>;
      console.log("res", res);
      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000,
        });
      } else {
        toast.success("Cart item is Deleted successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to delete cart item", {
        duration: 2000,
      });
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "Test Bike Name",
      brand: "Test Brand",
      model: "Test Model",
      price: 1000,
      quantity: 10,
      description: "Test Description",
    },
  });

  const handleCreateOrder = () => {};

  return (
    <Container>
      {cartItems?.data?.length === 0 ? (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" py={2} fontWeight={"bold"}>
            You Have No Cart Items!!!
          </Typography>
        </Box>
      ) : (
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
          <Box boxShadow={2}>
            <Typography
              variant="h6"
              py={2}
              textAlign={"center"}
              fontWeight={"bold"}
            >
              Product Items
            </Typography>
            {cartItems?.data?.map((item: TCart) => (
              <Box
                key={item._id}
                sx={{ display: "flex", p: 2, justifyContent: "space-between" }}
              >
                {/* <Divider /> */}
                <Box>
                  <Box display={"flex"} gap={2}>
                    <img
                      src={item?.product?.image}
                      alt={item?.product?.name}
                      width="50"
                      height="50"
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: "14px" }}>
                        {item?.product?.name}
                      </Typography>
                      <Divider></Divider>
                      <Typography variant="body2">
                        {item?.quantity} item x {item?.product?.price}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Fab
                    onClick={() => handleDeleteCart(item._id)}
                    size="small"
                    color="error"
                    aria-label="delete"
                    sx={{ ml: 5, mr: 2 }}
                  >
                    <DeleteIcon />
                  </Fab>
                </Box>
              </Box>
            ))}
            <Typography
              variant="body2"
              py={2}
              textAlign={"center"}
              fontWeight={"bold"}
            >
              Sub total price : {cartPrice}
            </Typography>
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
                label="Bike name"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Brand Name"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("brand")}
                error={!!errors.brand}
                helperText={errors.brand?.message}
              />
              <TextField
                label="Model Number"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("model")}
                error={!!errors.model}
                helperText={errors.model?.message}
              />
              <TextField
                type="number"
                label="Price"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
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
              <TextField
                multiline
                maxRows={4}
                label="Description"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("description")}
              />
              {/* <TextField
              label="User Type"
              variant="outlined"
              margin="normal"
              fullWidth
              select
              {...register('type')}
              error={!!errors.type}
              helperText={errors.type?.message}
            >
              <option value="">Choose user type</option>
              <option value="moderator">Moderator</option>
              <option value="member">Member</option>
            </TextField> */}
              <Box position="relative">
                <TextField
                  type="file"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  {...register("image")}
                  error={!!errors.image}
                  helperText={errors.image?.message}
                />
                {errors.image && (
                  <Typography color="error">{errors.image.message}</Typography>
                )}
              </Box>
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
      )}
    </Container>
  );
};

export default Checkout;
