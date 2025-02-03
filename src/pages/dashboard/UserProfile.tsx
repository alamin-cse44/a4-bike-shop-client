import {
  Card,
  Avatar,
  Typography,
  Button,
  Grid,
  IconButton,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSignleUserQuery } from "../../redux/features/user/userManagementApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be 8 characters or longer"),
});

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  const { data } = useGetSignleUserQuery(user?.userEmail);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [changePassword] = useChangePasswordMutation();


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Password Change Data:", data);
    const passInfo = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    const res = await changePassword(passInfo);
    console.log(res);
    if (res?.data?.success === true) {
      toast.success("Password changed successfully", {
        duration: 2000,
      });
      reset();
      handleClose();
    } else {
      toast.error("Password is incorrect", {
        duration: 2000,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {" "}
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
                  onClick={() => setOpen(true)}
                >
                  Change Password
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
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="change-password-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {/* 🔘 Modal Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Change Password</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* 📝 Form Fields */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 🔑 Old Password */}
              <TextField
                label="Old Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showPassword ? (
                        <IoMdEyeOff size={25} />
                      ) : (
                        <IoMdEye size={25} />
                      )}
                    </Button>
                  ),
                }}
                {...register("oldPassword")}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
              />

              {/* 🔒 New Password */}
              <TextField
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showNewPassword ? (
                        <IoMdEyeOff size={25} />
                      ) : (
                        <IoMdEye size={25} />
                      )}
                    </Button>
                  ),
                }}
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />

              {/* 🔘 Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Update Password
              </Button>
            </form>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default UserProfile;
