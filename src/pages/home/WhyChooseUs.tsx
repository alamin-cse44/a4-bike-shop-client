import { Box, Grid, Typography, Button, Container, Stack } from "@mui/material";
import poster from "../../assets/images/banner/b1.webp";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const WhyChooseUs = () => {
  const benefits = [
    "Premium Quality Bikes from Top Brands",
    "Affordable Prices with Transparent Pricing",
    "Trusted by Thousands of Happy Riders",
    "Easy & Flexible Financing Options",
    "Expert Maintenance & Technical Support",
  ];

  return (
    <Box sx={{ py: 12, bgcolor: "#fafafa" }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Left Side - Image with Premium Frame */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -20,
                  left: -20,
                  width: "100%",
                  height: "100%",
                  border: "2px solid #00CA52",
                  borderRadius: "24px",
                  zIndex: 0,
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={poster}
                  alt="Why Choose Us"
                  style={{
                    width: "100%",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  right: -30,
                  bgcolor: "#00CA52",
                  color: "#fff",
                  p: 3,
                  borderRadius: "16px",
                  zIndex: 2,
                  display: { xs: "none", sm: "block" },
                  boxShadow: "0 10px 30px rgba(0,202,82,0.3)",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  10+
                </Typography>
                <Typography variant="caption">Years of Excellence</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Content */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "#00CA52",
                  fontWeight: "bold",
                  letterSpacing: 2,
                }}
              >
                WHY CHOOSE US
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mt: 1,
                  mb: 3,
                  fontSize: { xs: "32px", md: "42px" },
                  color: "#1a1a1a",
                }}
              >
                Why Buy From Us?
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#666", lineHeight: 1.8, mb: 4 }}
              >
                We provide high-quality bikes with the best performance and
                durability. Our bikes are tested for safety, and we ensure
                competitive pricing along with excellent customer support
                through every step of your journey.
              </Typography>

              <Stack spacing={2} sx={{ mb: 5 }}>
                {benefits.map((benefit, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ color: "#00CA52", mt: 0.5 }}>
                      <FaCheckCircle size={20} />
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "500", color: "#333" }}
                    >
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Button
                component={Link}
                to="/product"
                variant="contained"
                size="large"
                endIcon={<FaArrowRight />}
                sx={{
                  bgcolor: "#00CA52",
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  borderRadius: "100px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 10px 20px rgba(0,202,82,0.2)",
                  "&:hover": {
                    bgcolor: "#00b548",
                    boxShadow: "0 15px 30px rgba(0,202,82,0.3)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s",
                }}
              >
                Explore Collection
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
