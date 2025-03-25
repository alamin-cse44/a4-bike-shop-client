import Banner from "./Banner";
import { Container } from "@mui/material";
import Review from "./Review";
import ProductList from "./ProductList";
import Categories from "./Categories";
import WhyChooseUs from "./WhyChooseUs";
import KeyFeatures from "./KeyFeatures";

const Home = () => {
  return (
    <Container>
      <Banner />
      <Categories />
      <ProductList />
      <WhyChooseUs />
      <KeyFeatures />
      <Review />
    </Container>
  );
};

export default Home;
