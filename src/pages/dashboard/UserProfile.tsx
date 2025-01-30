import {
  Card,
  Avatar,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import profile from "../../assets/profile.jpg";
import { useGetSignleUserQuery } from "../../redux/features/user/userManagementApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  userInfo: {
    name: string;
    email: string;
    role: string;
    active: boolean;
    ordersCount: number;
    cartItems: number;
    profileImage: string;
  };
  onEdit: () => void;
  onLogout: () => void;
}

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toastId = toast.loading("Loading ...");
  const user = useAppSelector(selectCurrentUser);
  // console.log("usr", user?.userEmail);

  const { data } = useGetSignleUserQuery(user?.userEmail);
  toast.success(data?.message, {
    id: toastId,
    duration: 2000,
  });
  // console.log("user data", data);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ p: 3, textAlign: "center" }}>
          <Avatar
            src={data?.data?.image}
            alt={"usr name"}
            sx={{ width: 80, height: 80, margin: "0 auto 16px auto" }}
          />
          <Typography variant="h5" gutterBottom>
            {data?.data?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {data?.data?.email}
          </Typography>
          <Typography
            variant="body2"
            color={!data?.data?.isBlocked ? "success.main" : "error.main"}
          >
            {!data?.data?.isBlocked ? "Active" : "Inactive"}
          </Typography>
          <Typography variant="body2">Role: {data?.data?.role}</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Orders: 20 | Cart: 5 items
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
