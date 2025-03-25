import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { LocalShipping, Security, Star, Build } from "@mui/icons-material";

const features = [
  {
    id: 1,
    icon: <LocalShipping fontSize="large" color="primary" />,
    title: "Free & Fast Delivery",
    description:
      "Get your dream bike delivered to your doorstep quickly and for free.",
  },
  {
    id: 2,
    icon: <Security fontSize="large" color="primary" />,
    title: "Secure Payment",
    description:
      "Multiple payment options with 100% security and easy EMI plans.",
  },
  {
    id: 3,
    icon: <Star fontSize="large" color="primary" />,
    title: "Top-Quality Bikes",
    description:
      "We offer high-performance bikes from leading brands with warranty support.",
  },
  {
    id: 4,
    icon: <Build fontSize="large" color="primary" />,
    title: "After-Sales Support",
    description:
      "We provide reliable service, maintenance, and genuine spare parts.",
  },
];

const KeyFeatures = () => {
  return (
    <Container>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="primary"
        align="center"
        mt={10}
        gutterBottom
      >
        Our Key Features
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" mb={4}>
        Why choose us? Here are some of the amazing benefits we offer.
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.id} >
            <Card sx={{ textAlign: "center", p: 2, boxShadow: 0, borderRadius: 2 }}>
              <CardContent>
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="body1" fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default KeyFeatures;
