import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import profile from "../../assets/profile.jpg";

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
  const user = useAppSelector(selectCurrentUser);

  console.log("usr", user);
  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ p: 3, textAlign: "center" }}>
          <Avatar
            src={profile}
            alt={"usr name"}
            sx={{ width: 80, height: 80, margin: "0 auto 16px auto" }}
          />
          <Typography variant="h5" gutterBottom>
            "User name"
          </Typography>
          <Typography variant="body1" color="text.secondary">
            user@gmail.com
          </Typography>
          <Typography
            variant="body2"
            color={true ? "success.main" : "error.main"}
          >
            {false ? "Active" : "Inactive"}
          </Typography>
          <Typography variant="body2">Role: Admin</Typography>
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
