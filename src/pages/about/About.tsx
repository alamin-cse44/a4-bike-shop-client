import { Button, Container, Typography, Box, Grid } from "@mui/material";

import coverImage from "../../assets/images/banner/b1.webp";
import hero1 from "../../assets/images/banner/b2.webp";
import hero2 from "../../assets/images/banner/b3.webp";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <Container>
        <Box
          sx={{
            height: {
              md: "65vh",
              xs: "50vh",
            },
            backgroundImage: `url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            p: 3,
            mt: 0.5
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom fontSize={22}>
              Discover our story and what drives us forward.
            </Typography>
            <Button
              component={Link}
              to={`/product`}
              variant="contained"
              color="secondary"
              sx={{
                color: "white",
                backgroundColor: "red",
                fontWeight: "bold",
                fontSize: {
                  md: "20px",
                  xs: "14px",
                },
                borderRadius: "5px",
              }}
            >
              Explore our bikes
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Section with Image Left, Text Right */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={hero1}
              alt="Team"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Empowering Riders – Our mission is to provide high-quality bikes
              that cater to every rider’s needs, from daily commuters to
              adventure enthusiasts. Affordable Excellence – We strive to offer
              premium bikes at competitive prices, ensuring that everyone can
              experience the joy of riding. Sustainable Mobility – Promoting
              eco-friendly transportation, we support a greener future by
              offering fuel-efficient and electric bike options.
              Customer-Centric Service – Our goal is to deliver exceptional
              customer service, ensuring a seamless buying experience with
              expert guidance and support. Innovation & Performance – We bring
              the latest technology and cutting-edge designs to enhance
              performance, safety, and comfort for all riders. 🚴‍♂️🔥
            </Typography>
            <Button
              component={Link}
              to={`/product`}
              variant="contained"
              color="primary"
            >
              BUY NOW
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Section with Text Left, Image Right */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Typography variant="h4" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              Our vision is to become the most trusted and customer-centric bike
              retailer, offering a diverse range of high-quality motorcycles and
              bicycles to riders worldwide. We aim to revolutionize the biking
              experience by integrating innovation, sustainability, and
              affordability into every product we offer. By fostering a
              passionate riding community, we strive to inspire adventure,
              freedom, and exploration. Our commitment to excellence drives us
              to continuously enhance our services, ensuring that every customer
              finds their perfect ride. Through eco-friendly solutions and
              cutting-edge technology, we envision a future where biking is
              accessible, enjoyable, and environmentally responsible. 🚴‍♂️🔥
            </Typography>
            <Button
              component={Link}
              to={`/product`}
              variant="contained"
              color="primary"
            >
              Explore More
            </Button>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <img
              src={hero2}
              alt="Vision"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default About;
