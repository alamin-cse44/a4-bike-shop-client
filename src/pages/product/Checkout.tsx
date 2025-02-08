import {
  Box,
  Container,
  Divider,
  Fab,
  Typography,
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
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Bike name is required"),
//   brand: Yup.string().required("Brand name is required"),
//   model: Yup.string().required("Model name is required"),
//   price: Yup.number().required("Price is required"),
//   quantity: Yup.number().required("Quantity is required"),
//   description: Yup.string(),
//   // type: Yup.string().required("User type is required"),
//   image: Yup.mixed().required("Image is required"),
// });

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
              flexDirection: "column",
            }}
            p={2}
            borderRadius={3}
            boxShadow={2}
          >
           <h2>OPPS!</h2>
           <h3>This functionality, order with the cart items will be implemented later. Here, you can add any product in your cart and also can delete if you want! <br />
           However, if you want to order any product, please go to the product page. You will get many products, you need to click view details button and then you will be able to make your order. <br />
           Thank you!
           </h3>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Checkout;
