import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { toast } from "sonner";
import {
  useCreateBikesMutation,
  useGetSignleBikeQuery,
} from "../redux/features/bike/bikeApi";
import { TBike, TResponse } from "../types";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Bike name is required"),
  brand: Yup.string().required("Brand name is required"),
  model: Yup.string().required("Model name is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  description: Yup.string(),
  // type: Yup.string().required("User type is required"),
  image: Yup.mixed().required("Image is required"),
});

type Id = {
  id?: string;
};

const UpdateProductForm: FC<Id> = ({ id }) => {
  const [createBikes] = useCreateBikesMutation();
  const {
    data: bikeData,
    isLoading,
    error,
  } = useGetSignleBikeQuery(id, {
    skip: !id, // ✅ Prevents query execution when id is not provided
  });

  console.log("single data", bikeData?.data);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: bikeData?.data?.name,
      brand: bikeData?.data?.brand,
      model: bikeData?.data?.model,
      price: bikeData?.data?.price,
      quantity: bikeData?.data?.quantity,
      description: bikeData?.data?.quantity,
      image: bikeData?.data?.image,
    },
  });

  if (isLoading) {
    return toast("Loading...");
  }

  const handleUpdateProduct: SubmitHandler<FieldValues> = async (data) => {
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
        <Box bgcolor="white" p={2} borderRadius={3} boxShadow={0}>
          <form onSubmit={handleSubmit(handleUpdateProduct)}>
            <TextField
              label="Bike name"
              defaultValue={bikeData?.data?.name}
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Brand Name"
              defaultValue={bikeData?.data?.brand}
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("brand")}
              error={!!errors.brand}
              helperText={errors.brand?.message}
            />
            <TextField
              label="Model Number"
              defaultValue={bikeData?.data?.model}
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
              defaultValue={bikeData?.data?.price}
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
              defaultValue={bikeData?.data?.quantity}
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
              defaultValue={bikeData?.data?.description}
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
            <Box position="relative">
              <TextField
                type="file"
                defaultValue={bikeData?.data?.image}
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
              Update Product
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpdateProductForm;
