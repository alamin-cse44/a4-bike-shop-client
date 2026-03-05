import { Box, Grid, Typography, Container, Paper, alpha } from "@mui/material";
import {
  LocalShipping,
  Security,
  Verified,
  Handyman,
} from "@mui/icons-material";

const features = [
  {
    id: 1,
    icon: <LocalShipping sx={{ fontSize: 32 }} />,
    title: "Free & Fast Delivery",
    description:
      "Get your dream bike delivered to your doorstep quickly and for free.",
    color: "#00CA52",
  },
  {
    id: 2,
    icon: <Security sx={{ fontSize: 32 }} />,
    title: "Secure Payment",
    description:
      "Multiple payment options with 100% security and easy EMI plans.",
    color: "#00CA52",
  },
  {
    id: 3,
    icon: <Verified sx={{ fontSize: 32 }} />,
    title: "Top-Quality Bikes",
    description:
      "We offer high-performance bikes from leading brands with warranty support.",
    color: "#00CA52",
  },
  {
    id: 4,
    icon: <Handyman sx={{ fontSize: 32 }} />,
    title: "After-Sales Support",
    description:
      "We provide reliable service, maintenance, and genuine spare parts.",
    color: "#00CA52",
  },
];

const KeyFeatures = () => {
  return (
    <Box sx={{ py: 12, bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="overline"
            sx={{
              color: "#00CA52",
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            OUR ADVANTAGES
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mt: 1,
              fontSize: { xs: "28px", md: "42px" },
              color: "#1a1a1a",
            }}
          >
            Our Key Features
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: "#00CA52",
              margin: "20px auto 0",
              borderRadius: 2,
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  borderRadius: "24px",
                  transition: "all 0.3s ease",
                  border: "1px solid #f0f0f0",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: `0 20px 40px ${alpha("#00CA52", 0.08)}`,
                    borderColor: "#00CA52",
                    "& .feature-icon": {
                      bgcolor: "#00CA52",
                      color: "#fff",
                      transform: "rotateY(360deg)",
                    },
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px auto",
                    bgcolor: alpha("#00CA52", 0.1),
                    color: "#00CA52",
                    transition: "all 0.6s ease",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default KeyFeatures;
