import { FC, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or longer")
    .matches(
      /(?=.*[A-Z])(?=.*[!@#&*])(?=.*[0-9])/,
      "Password should be 8 or longer and contain upper, lower, special character, and number"
    )
    .required("Password is required"),
});

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSignup = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);

    // try {
    //   const response = await fetch(
    //     `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    //     {
    //       method: 'POST',
    //       body: formData,
    //     }
    //   );

    // } catch (error) {
    //   console.error('Error during signup:', error);
    // }
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
              Login
            </Typography>
            <form onSubmit={handleSubmit(handleSignup)}>
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
              <Button
                type="submit"
                sx={{ my: 2, color: "white", borderRadius: 1 }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Login
              </Button>
              {/* <Typography align="center" variant="body1" gutterBottom>
              Or, Sign in with
            </Typography> */}
              {/* <SocialAppLogin /> */}
              <Typography align="center" variant="body1" gutterBottom>
                Don't have an account?{" "}
                <Link to="/signup" style={{ fontWeight: "bold" }}>
                  Create your account
                </Link>
              </Typography>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
