import { Box, Grid, Typography, Button, Container } from "@mui/material";

import poster from "../../assets/images/banner/b1.webp";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  return (
    <>
      <Grid container sx={{ mt: 10 }} spacing={4} alignItems="center">
        {/* Left Side - Image */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <img
              src={poster}
              alt="Why Choose Us"
              style={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Grid>

        {/* Right Side - Content */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Why Buy From Us?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We provide high-quality bikes with the best performance and
            durability. Our bikes are tested for safety, and we ensure
            competitive pricing along with excellent customer support.
          </Typography>
          <ul style={{ listStyle: "none" }}>
            <li>
              <Typography variant="body1">✅ Premium Quality Bikes</Typography>
            </li>
            <li>
              <Typography variant="body1">✅ Affordable Prices</Typography>
            </li>
            <li>
              <Typography variant="body1">✅ Trusted by Thousands</Typography>
            </li>
            <li>
              <Typography variant="body1">✅ Easy Financing Options</Typography>
            </li>
          </ul>
          <Button
            component={Link}
            to="/product"
            variant="contained"
            color="primary"
            sx={{ color: "white", fontWeight: "bold", mt: 3 }}
          >
            Explore Bikes
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default WhyChooseUs;
