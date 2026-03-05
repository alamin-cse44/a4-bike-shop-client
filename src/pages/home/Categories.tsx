import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  alpha,
} from "@mui/material";
import { bikeCategories } from "../../config/bike";
import { Link } from "react-router-dom";

import c1 from "../../assets/images/sport1.webp";
import c2 from "../../assets/images/cruiser1.webp";
import c3 from "../../assets/images/adventure1.webp";
import c4 from "../../assets/images/adventure2.webp";
import c5 from "../../assets/images/cruiser2.webp";

const categoryIcons: Record<string, string> = {
  Sport: c1,
  Cruiser: c2,
  Adventure: c3,
  Naked: c4,
  Dirt: c5,
};

const updatedCategories = bikeCategories.map((category) => ({
  ...category,
  image: categoryIcons[category.category] || c1,
}));

const Categories = () => {
  return (
    <Container maxWidth="lg">
      <Box my={12}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            sx={{
              color: "#00CA52",
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            EXPLORE BY CATEGORY
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
            Find Your Perfect Ride
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

        <Grid container spacing={3} justifyContent="center">
          {updatedCategories?.map((category) => (
            <Grid item xs={6} sm={4} md={2.4} key={category?.id}>
              <Link
                to={`/product?categories=${category?.category}`}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "20px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.3s ease-in-out",
                    border: "1px solid #f0f0f0",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      borderColor: "#00CA52",
                      transform: "translateY(-10px)",
                      boxShadow: `0 20px 40px ${alpha("#00CA52", 0.12)}`,
                      "& .cat-avatar": {
                        transform: "scale(1.1)",
                        backgroundColor: "#00CA52",
                      },
                      "& .cat-name": {
                        color: "#00CA52",
                      },
                    },
                  }}
                >
                  <Avatar
                    className="cat-avatar"
                    src={category?.image}
                    sx={{
                      width: 80,
                      height: 80,
                      margin: "0 auto 20px auto",
                      bgcolor: "#f8f9fa",
                      transition: "all 0.3s ease-in-out",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Typography
                    className="cat-name"
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "16px", md: "18px" },
                      color: "#333",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {category?.category}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#aaa",
                      display: "block",
                      mt: 0.5,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    View Collection
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Categories;
