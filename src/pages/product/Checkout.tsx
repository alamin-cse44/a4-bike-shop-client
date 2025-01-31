import {
  Box,
  Button,
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
        >
          <Box
            component="img"
            // src={data?.data?.image}
            alt="Fitness"
            sx={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "16px",
              boxShadow: 3,
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
