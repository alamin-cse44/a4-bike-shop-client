import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  alpha,
  Stack,
} from "@mui/material";
import coverImage from "../../assets/images/banner/b1.webp";
import hero1 from "../../assets/images/banner/b2.webp";
import hero2 from "../../assets/images/banner/b3.webp";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBullseye, FaBinoculars } from "react-icons/fa";

const About = () => {
  return (
    <Box sx={{ pb: 12 }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: { md: "70vh", xs: "60vh" },
          position: "relative",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          mb: 12,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{
              color: "#00CA52",
              fontWeight: "bold",
              letterSpacing: 3,
              display: "block",
              mb: 2,
            }}
          >
            OUR STORY
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "36px", md: "64px" },
              lineHeight: 1.2,
            }}
          >
            Experience The Thrill Of The Ride
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 5,
              fontWeight: "400",
              color: "rgba(255,255,255,0.8)",
              fontSize: { xs: "16px", md: "20px" },
            }}
          >
            Discover our journey of excellence in providing the finest bikes and
            unparalleled rider experiences since the beginning.
          </Typography>
          <Button
            component={Link}
            to="/product"
            variant="contained"
            size="large"
            endIcon={<FaArrowRight />}
            sx={{
              bgcolor: "#00CA52",
              color: "#fff",
              px: { xs: 4, md: 6 },
              py: 2,
              borderRadius: "100px",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 10px 30px rgba(0,202,82,0.3)",
              "&:hover": {
                bgcolor: "#00b548",
                transform: "translateY(-3px)",
                boxShadow: "0 15px 40px rgba(0,202,82,0.4)",
              },
              transition: "all 0.3s",
            }}
          >
            Explore Our Collection
          </Button>
        </Container>
      </Box>

      {/* Our Mission */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  width: "100%",
                  height: "100%",
                  border: "2px solid #00CA52",
                  borderRadius: "30px",
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "30px",
                  overflow: "hidden",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={hero1}
                  alt="Our Mission"
                  style={{ width: "100%", display: "block" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    bgcolor: alpha("#00CA52", 0.1),
                    color: "#00CA52",
                    p: 1.5,
                    borderRadius: "12px",
                    display: "flex",
                  }}
                >
                  <FaBullseye size={24} />
                </Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#00CA52",
                    fontWeight: "bold",
                    letterSpacing: 2,
                  }}
                >
                  STRENGTH AND PURPOSE
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", color: "#1a1a1a" }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", lineHeight: 1.8, fontSize: "1.05rem" }}
              >
                Empowering Riders – Our mission is to provide high-quality bikes
                that cater to every rider’s needs, from daily commuters to
                adventure enthusiasts. We strive to offer premium bikes at
                competitive prices, ensuring that everyone can experience the
                joy of riding.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", lineHeight: 1.8, fontSize: "1.05rem" }}
              >
                Sustainable Mobility – Promoting eco-friendly transportation, we
                support a greener future by offering fuel-efficient and electric
                bike options while delivering exceptional customer service.
              </Typography>
              <Box pt={2}>
                <Button
                  component={Link}
                  to="/product"
                  variant="outlined"
                  sx={{
                    borderColor: "#00CA52",
                    color: "#00CA52",
                    borderRadius: "100px",
                    px: 4,
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: "#00b548",
                      bgcolor: alpha("#00CA52", 0.05),
                    },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Our Vision */}
      <Box sx={{ bgcolor: "#fafafa", py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Stack spacing={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      bgcolor: alpha("#00CA52", 0.1),
                      color: "#00CA52",
                      p: 1.5,
                      borderRadius: "12px",
                      display: "flex",
                    }}
                  >
                    <FaBinoculars size={24} />
                  </Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#00CA52",
                      fontWeight: "bold",
                      letterSpacing: 2,
                    }}
                  >
                    FUTURE ORIENTED
                  </Typography>
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold", color: "#1a1a1a" }}
                >
                  Our Vision
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#555", lineHeight: 1.8, fontSize: "1.05rem" }}
                >
                  Our vision is to become the most trusted and customer-centric
                  bike retailer globally. We aim to revolutionize the biking
                  experience by integrating innovation, sustainability, and
                  affordability into every product we offer.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#555", lineHeight: 1.8, fontSize: "1.05rem" }}
                >
                  Through eco-friendly solutions and cutting-edge technology, we
                  envision a future where biking is accessible, enjoyable, and
                  environmentally responsible for every generation of riders.
                </Typography>
                <Box pt={2}>
                  <Button
                    component={Link}
                    to="/product"
                    variant="contained"
                    sx={{
                      bgcolor: "#00CA52",
                      color: "#fff",
                      borderRadius: "100px",
                      px: 4,
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#00b548" },
                    }}
                  >
                    See More
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                    width: "100%",
                    height: "100%",
                    border: "2px solid #00CA52",
                    borderRadius: "30px",
                    zIndex: 0,
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "30px",
                    overflow: "hidden",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src={hero2}
                    alt="Our Vision"
                    style={{ width: "100%", display: "block" }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: -20,
                    bgcolor: "#fff",
                    p: 3,
                    borderRadius: "16px",
                    zIndex: 2,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#00CA52", fontWeight: "bold" }}
                  >
                    100% Reliable
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Trusted by Experts
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
