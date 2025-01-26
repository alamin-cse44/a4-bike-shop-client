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
  bike: Yup.string().required("Bike name is required"),
  brand: Yup.string().required("Brand name is required"),
  model: Yup.string().required("Model name is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  type: Yup.string().required("User type is required"),
  file: Yup.mixed().required("File is required"),
});

const AddproductForm: FC = () => {
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
    <Grid mt={4}>
      <Grid item xs={12} md={12}>
        <Box bgcolor="white" p={2} borderRadius={3} boxShadow={0}>
          <form onSubmit={handleSubmit(handleSignup)}>
            <TextField
              label="Bike name"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("bike")}
              error={!!errors.bike}
              helperText={errors.bike?.message}
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
                {...register("file")}
                error={!!errors.file}
                helperText={errors.file?.message}
              />
              {errors.file && (
                <Typography color="error">{errors.file.message}</Typography>
              )}
            </Box>
            <Button
              type="submit"
              sx={{ my: 2, color: "white", borderRadius: 1 }}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Create Product
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddproductForm;
