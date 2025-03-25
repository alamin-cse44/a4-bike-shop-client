import Banner from "./Banner";
import { Container } from "@mui/material";
import Review from "./Review";
import ProductList from "./ProductList";
import Categories from "./Categories";

const Home = () => {
  return (
    <Container>
      <Banner />
      <Categories />
      <ProductList />
      <Review />
    </Container>
  );
};

export default Home;
