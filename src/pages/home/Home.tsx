import Banner from "./Banner";
import { Container } from "@mui/material";
import Review from "./Review";
import ProductList from "./ProductList";

const Home = () => {
  return (
    <Container>
      <Banner />
      <ProductList />
      <Review />
    </Container>
  );
};

export default Home;
