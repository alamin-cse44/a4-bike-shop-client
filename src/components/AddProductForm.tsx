import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { toast } from "sonner";
import { useCreateBikesMutation } from "../redux/features/bike/bikeApi";
import { TBike, TResponse } from "../types";
import { bikeBrands, bikeCategories } from "../config/bike";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Bike name is required"),
  categories: Yup.string().required("Category name is required"),
  brand: Yup.string().required("Brand name is required"),
  model: Yup.string().required("Model name is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  description: Yup.string(),
  image: Yup.mixed().required("Image is required"),
});

const AddProductForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    // defaultValues: {
    //   name: "Test Bike Name",
    //   categories: "Sport",
    //   brand: "Test Brand",
    //   model: "Test Model",
    //   price: 1000,
    //   quantity: 10,
    //   description: "Test Description",
    // },
  });

  const [createBikes] = useCreateBikesMutation();

  const handleCreateProduct: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);
    const toastId = toast.loading("Product is creating...");
    console.log(data);
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
        const bikeInfo = {
          name: data.name,
          categories: data.categories,
          brand: data.brand,
          model: data.model,
          price: data.price,
          quantity: data.quantity,
          description: data?.description,
          image: img_result.url,
        };
        // console.log("final data", bikeInfo);
        try {
          const res = (await createBikes(bikeInfo)) as TResponse<TBike>;
          console.log("res", res);
          if (res.error) {
            toast.error(res.error.data.message, {
              id: toastId,
              duration: 2000,
            });
          } else {
            toast.success("Product is created successfully", {
              id: toastId,
              duration: 2000,
            });
          }
        } catch (error) {
          toast.error("Failed to create product", {
            id: toastId,
            duration: 2000,
          });
        }
      } else {
        toast.error("Please select your image!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to upload your image!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Grid mt={4}>
      <Grid item xs={12} md={12}>
        <Box p={2} borderRadius={3} boxShadow={0}>
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
              label="Category Type"
              variant="outlined"
              fullWidth
              margin="normal"
              select
              {...register("categories")}
              error={!!errors.categories}
              helperText={errors.categories?.message}
            >
              <MenuItem value="" disabled>
                Choose Category
              </MenuItem>
              {bikeCategories.map((cat) => (
                <MenuItem key={cat.id} value={cat.category}>
                  {cat.category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Brand Name"
              variant="outlined"
              fullWidth
              margin="normal"
              select
              {...register("brand")}
              error={!!errors.brand}
              helperText={errors.brand?.message}
            >
              <MenuItem value="" disabled>
                Choose Brand
              </MenuItem>
              {bikeBrands.map((brand) => (
                <MenuItem key={brand.id} value={brand.brand}>
                  {brand.brand}
                </MenuItem>
              ))}
            </TextField>
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
              Create Product
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddProductForm;
