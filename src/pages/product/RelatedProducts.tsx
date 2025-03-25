import { useState } from "react";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard";

type FilterState = Record<string, string | number>;

const RelatedProducts = ({ categories }: { categories: string }) => {
  const [params, setParams] = useState<FilterState>({
    limit: 100,
    search: "",
    sortOrder: "desc",
    categories,
  });
  const { data, isLoading } = useGetAllBikesQuery(params);
  console.log("Category :", categories);
  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          my: 5,
          fontSize: { xs: "18px", md: "35px" },
        }}
      >
        Related Bikes
      </Typography>

      {isLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          {Array.from(new Array(6)).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={300} />
          ))}
        </div>
      ) : (
        <Grid container spacing={3}>
          {data?.data?.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {data?.data?.length === 0 && (
        <Box height={"20vh"}>No product to show!!!</Box>
      )}
    </div>
  );
};

export default RelatedProducts;
