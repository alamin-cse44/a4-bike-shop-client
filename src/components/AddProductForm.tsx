import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { toast } from "sonner";
import { useCreateBikesMutation } from "../redux/features/bike/bikeApi";
import { TBike, TResponse } from "../types";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Bike name is required"),
  brand: Yup.string().required("Brand name is required"),
  model: Yup.string().required("Model name is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  description: Yup.string(),
  // type: Yup.string().required("User type is required"),
  // image: Yup.mixed(),
});

const AddproductForm: FC = () => {
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

  const [createBikes] = useCreateBikesMutation();

  const handleCreateProduct: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Product is creating...");
    console.log(data);

    const bikeInfo = {
      name: data.name,
      brand: data.brand,
      model: data.model,
      price: data.price,
      quantity: data.quantity,
      description: data?.description,
    };
    try {
      const res = await createBikes(bikeInfo) as TResponse<TBike>;
      console.log("res", res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Product is created successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to create product", { id: toastId, duration: 2000 });
    }

    // const formData = new FormData();
    // console.log("formData", formData);
    // formData.append("image", data.file[0]);

    // try {
    //   const response = await fetch(
    //     `https://api.imgbb.com/1/upload?key=${process.env.REACT_PUBLIC_IMGBB_API_KEY}`,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );

    //   const result = await response.json();
    //   console.log("image response: ", result);
    //   if (result.success) {
    //     const bike = {
    //       name: data.name,
    //       brand: data.brand,
    //       model: data.model,
    //       price: data.price,
    //       quantity: data.quantity,
    //       description: data.description,
    //       image: result.data.url,
    //     };
    //     console.log("final data", bike);
    //   }
    // } catch (error) {
    //   console.error("Error during product creation:", error);
    // }
  };

  return (
    <Grid mt={4}>
      <Grid item xs={12} md={12}>
        <Box bgcolor="white" p={2} borderRadius={3} boxShadow={0}>
          <form onSubmit={handleSubmit(handleCreateProduct)}>
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
            {/* <Box position="relative">
              <TextField
                type="file"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register("image")}
                // error={!!errors.image}
                // helperText={errors.image?.message}
              />
              {errors.image && (
                <Typography color="error">{errors.image.message}</Typography>
              )}
            </Box> */}
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
