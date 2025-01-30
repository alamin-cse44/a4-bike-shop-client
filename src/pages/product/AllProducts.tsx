import ProductCard from "../../components/ProductCard";
import { Typography } from "@mui/material";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";

const AllProducts = () => {
  const { data } = useGetAllBikesQuery(undefined);
    // [{name: "name", value: "Bike 1"}]
    console.log("bikes", data?.data);
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          my: 5,
          fontSize: { xs: "18px", md: "35px" },
        }}
      >
        Our Products
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {data?.data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default AllProducts;


