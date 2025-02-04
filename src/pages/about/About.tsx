import { Button, Container, Typography, Box, Grid } from "@mui/material";

import coverImage from "../../assets/first.webp";
import hero1 from "../../assets/first.webp";
import hero2 from "../../assets/first.webp";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: "80vh",
          backgroundImage:
            `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          p: 3,
        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" gutterBottom>
            Discover our story and what drives us forward.
          </Typography>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Container>
      </Box>

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
              We aim to deliver exceptional solutions tailored to your needs,
              ensuring quality and innovation at every step.
            </Typography>
            <Button variant="contained" color="primary">
              Read More
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
              To be a leader in our industry, creating a positive impact through
              technology and innovation.
            </Typography>
            <Button variant="contained" color="primary">
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
