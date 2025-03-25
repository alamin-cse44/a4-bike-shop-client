import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { bikeCategories } from "../../config/bike";

import c1 from "../../assets/images/sport1.webp";
import c2 from "../../assets/images/cruiser1.webp";
import c3 from "../../assets/images/adventure1.webp";
import c4 from "../../assets/images/adventure2.webp";
import c5 from "../../assets/images/cruiser2.webp";
import { Link } from "react-router-dom";

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

console.log("updatedCategories", updatedCategories);

const Categories = () => {
  return (
    <Box my={10}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: { xs: "18px", md: "35px" },
        }}
      >
        Categories
      </Typography>

      <Grid container spacing={2}>
        {updatedCategories?.map((category) => (
          <Grid item xs={4} lg={2.4} key={category?.id}>
            <Link
              to={`/product?categories=${category?.category}`}
              style={{ textDecoration: "none" }}
            >
              <Paper
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <Avatar
                  //   variant="circle"
                  src={category?.image}
                  sx={{ width: 60, height: 60, margin: "0 auto 16px auto" }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "14px", md: "18px" },
                    textAlign: "center",
                  }}
                >
                  {category?.category}
                </Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
