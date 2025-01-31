import { Box, Button, Divider, Fab, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useDeleteCartMutation,
  useGetCartByEmailQuery,
} from "../../redux/features/cart/cartApi";
import { toast } from "sonner";
import {  TCart, TResponse } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const Carts = () => {
  const user = useAppSelector(selectCurrentUser);
  const [deleteCart] = useDeleteCartMutation();

  const { data: cartItems } = useGetCartByEmailQuery(user?.userEmail);
//   console.log("cartItems", cartItems);
  if (!cartItems?.data) return toast.loading("Loading...");

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
    <Box>
      <Box  sx={{ height: "75vh", overflow: "auto" }}>
        {cartItems.data?.map((item: TCart) => (
          <Box key={item._id}  sx={{ display: "flex",p: 2, }} >
            {/* <Divider /> */}
            <Box >
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
      </Box>

      <div style={{ textAlign: "center", marginTop: "1px" }}>
        <Typography variant="body2" my={2} fontWeight={"bold"}>
          Sub total priace : {cartPrice}
        </Typography>
        <Button
          component={Link}
          to="/product"
          variant="contained"
          color="primary"
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Order Now
        </Button>
      </div>
    </Box>
  );
};

export default Carts;
