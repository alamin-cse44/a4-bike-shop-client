import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Link as MuiLink,
  Container,
} from "@mui/material";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import img from "../assets/logo.png";

const Footer = () => {
  return (
    <Box bgcolor={"#D5E4DB"}>
      <Container>
        <Box component="footer" py={4} mt={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <img src={img} alt="footer_img" width={150} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Information
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box>
                  <MuiLink
                    component={Link}
                    to="/"
                    color="inherit"
                    underline="hover"
                  >
                    Home
                  </MuiLink>
                </Box>
                <Box>
                  <MuiLink
                    component={Link}
                    to="/product"
                    color="inherit"
                    underline="hover"
                  >
                    Product
                  </MuiLink>
                </Box>
                <Box>
                  <MuiLink
                    component={Link}
                    to="/about"
                    color="inherit"
                    underline="hover"
                  >
                    About
                  </MuiLink>
                </Box>
                <Box>
                  <MuiLink
                    component={Link}
                    to="/login"
                    color="inherit"
                    underline="hover"
                  >
                    Login
                  </MuiLink>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box>alamincse44@gmail.com</Box>
                <Box>Kalabagan, Dhaka</Box>
              </Box>
            </Grid>
          </Grid>
          <Box mt={4} textAlign="center">
            <Box
              mb={2}
              display={"flex"}
              textAlign={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Link to={""}>
                <FaFacebook size={30} />
              </Link>
              <Link to={""}>
                <FaLinkedin size={30} />
              </Link>
            </Box>
            <Typography variant="body2" color="textSecondary">
              © 2025 Rehan. All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
