import ProductCard from "../../components/ProductCard";
import { Button, Typography } from "@mui/material";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";
import { Link } from "react-router-dom";


const ProductList = () => {
  const { data } = useGetAllBikesQuery({});

  const bikes = data?.data?.slice(0, 6);
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
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
        {bikes?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* View More Button */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Button
          component={Link}
          to="/product"
          variant="contained"
          color="primary"
          sx={{color: "white", fontWeight: "bold"}}
        >
          View More
        </Button>
      </div>
    </>
  );
};

export default ProductList;


