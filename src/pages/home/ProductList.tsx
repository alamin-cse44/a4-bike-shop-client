import ProductCard from "../../components/ProductCard";
import img from "../../assets/first.webp";
import { Typography } from "@mui/material";
import { useGetAllBikesQuery } from "../../redux/features/bike/bikeApi";

const ProductList = () => {
  const { data } = useGetAllBikesQuery(undefined);
  console.log("bikes", data);
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;

const products = [
  {
    id: 1,
    name: "Nike Air MX Super 2500 - Red",
    image: img,
    price: 449,
    originalPrice: 699,
    discount: 39,
    rating: 5,
    ratingCount: 5,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21 - Blue",
    image: img,
    price: 179,
    originalPrice: 299,
    discount: 40,
    rating: 4.8,
    ratingCount: 128,
  },
  {
    id: 3,
    name: "Converse Chuck Taylor All Star - White",
    image: img,
    price: 59,
    originalPrice: 89,
    discount: 34,
    rating: 4.6,
    ratingCount: 72,
  },
  {
    id: 4,
    name: "Reebok Classic Leather - Black",
    image: img,
    price: 69,
    originalPrice: 99,
    discount: 30,
    rating: 4.4,
    ratingCount: 41,
  },
  {
    id: 5,
    name: "Reebok Classic Leather - Black",
    image: img,
    price: 69,
    originalPrice: 99,
    discount: 30,
    rating: 4.4,
    ratingCount: 41,
  },
  {
    id: 6,
    name: "Reebok Classic Leather - Black",
    image: img,
    price: 69,
    originalPrice: 99,
    discount: 30,
    rating: 4.4,
    ratingCount: 41,
  },
];
