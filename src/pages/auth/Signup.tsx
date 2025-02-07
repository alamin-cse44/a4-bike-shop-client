import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateUserMutation } from "../../redux/features/user/userManagementApi";
import { TResponse, TUserRegistration } from "../../types";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or longer")
    // .matches(
    //   /(?=.*[A-Z])(?=.*[!@#&*])(?=.*[0-9])/,
    //   "Password should be 8 or longer and contain upper, lower, special character, and number"
    // )
    .required("Password is required"),
  image: Yup.mixed().required("Image is required"),
  // type: Yup.string().required("User type is required"),
});

const Signup: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // name: "Rehan",
      // email: "rehan@gmail.com",
      // password: "pass1234",
    },
  });

  const [createUser] = useCreateUserMutation();

  const handleSignup: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registration is on process...");
    // console.log("data", data);
    const formData = new FormData();
    // console.log("formData", formData);
    formData.append("file", data.image[0]);
    formData.append("upload_preset", "first_preset_name");
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const img_result = await response.json();
      // console.log("image response: ", img_result.url);
      if (img_result.url) {
        const userInfo = {
          name: data.name,
          email: data.email,
          password: data.password,
          image: img_result.url,
        };
        // console.log("final data", userInfo);
        try {
          const res = (await createUser(userInfo)) as TResponse<TUserRegistration>;
          console.log("res", res);
          if (res.error) {
            toast.error(res.error.data.message, {
              id: toastId,
              duration: 2000,
            });
          } else {
            toast.success("Successfully Registered!", {
              id: toastId,
              duration: 2000,
            });
            navigate("/dashboard");
          }
        } catch (error) {
          toast.error("Failed to registe", {
            id: toastId,
            duration: 2000,
          });
        }
      } else {
        toast.error("Failed to upload your image!", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("Failed to upload your image!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Container>
      <Grid
        container
        spacing={4}
        mt={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{mr:5 ,display: {xs: "none", md: "block"}}}>
            <img src="https://next-auth-app-sand.vercel.app/assets/images/login/login.svg" alt="" width={"100%"} />
          </Box>
        </Grid> */}
        <Grid item xs={12} md={5}>
          <Box bgcolor="white" p={4} borderRadius={3} boxShadow={3}>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(handleSignup)}>
              <TextField
                label="Your name"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Your email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  fullWidth
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
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Box>
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
                Create an account
              </Button>
              {/* <Typography align="center" variant="body1" gutterBottom>
              Or, Sign in with
            </Typography> */}
              {/* <SocialAppLogin /> */}
              <Typography align="center" variant="body1" gutterBottom>
                Already have an account?{" "}
                <Link to="/login" style={{ fontWeight: "bold" }}>
                  Sign in here
                </Link>
              </Typography>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
