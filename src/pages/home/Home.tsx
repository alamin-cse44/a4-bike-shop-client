import Banner from "./Banner";
import { Container } from "@mui/material";
import Review from "./Review";
import ProductList from "./ProductList";
import Footer from "./Footer";

const Home = () => {
  return (
    <Container>
      <Banner />
      <ProductList />
      <Review />
      <Footer />
    </Container>
  );
};

export default Home;
