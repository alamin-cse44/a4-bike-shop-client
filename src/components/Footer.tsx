import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Link as MuiLink,
  Container,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import {
  FaFacebook,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronRight,
} from "react-icons/fa";
import mainLogo from "../assets/icons/main-logo.jpg";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#111",
        color: "#fff",
        pt: 8,
        pb: 4,
        mt: 10,
        position: "relative",
        borderTop: "3px solid #00CA52",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo and About */}
          <Grid item xs={12} md={4}>
            <Box mb={3}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  display: "inline-block",
                  p: 1,
                  borderRadius: "10px",
                  mb: 2,
                }}
              >
                <img src={mainLogo} alt="Rehan Bike Shop" width={120} />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#aaa", lineHeight: 1.8, mb: 3 }}
              >
                Rehan Bike Shop is your premium destination for the finest
                motorcycles and cycling gear. Experience the thrill of the ride
                with our curated collection of top-tier brands and expert
                service.
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "&:hover": { bgcolor: "#00CA52" },
                  }}
                  href="https://www.facebook.com/rehan.mohammed.al.amin"
                  target="_blank"
                >
                  <FaFacebook size={18} />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    "&:hover": { bgcolor: "#00CA52" },
                  }}
                  href="https://www.linkedin.com/in/al-amin-1b4587216/"
                  target="_blank"
                >
                  <FaLinkedin size={18} />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {[
                { name: "Home", path: "/" },
                { name: "All Products", path: "/product" },
                { name: "Categories", path: "/product" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <MuiLink
                  key={link.name}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: "#aaa",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    transition: "all 0.3s",
                    "&:hover": { color: "#00CA52", pl: 1 },
                  }}
                >
                  <FaChevronRight size={10} /> {link.name}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Information */}
          <Grid item xs={12} sm={6} md={2.5}>
            <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
              Help & Info
            </Typography>
            <Stack spacing={2}>
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Return & Refund",
                "Shipping Info",
                "FAQs",
              ].map((text) => (
                <Typography
                  key={text}
                  variant="body2"
                  sx={{
                    color: "#aaa",
                    cursor: "pointer",
                    "&:hover": { color: "#00CA52" },
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FaChevronRight size={10} /> {text}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Contact Details */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom mb={3}>
              Get In Touch
            </Typography>
            <Stack spacing={2.5}>
              <Box display="flex" gap={2}>
                <Box
                  sx={{
                    color: "#00CA52",
                    fontSize: "1.2rem",
                    mt: 0.5,
                  }}
                >
                  <FaMapMarkerAlt />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Office Address
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    Kalabagan, Dhaka, Bangladesh
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" gap={2}>
                <Box
                  sx={{
                    color: "#00CA52",
                    fontSize: "1.2rem",
                    mt: 0.5,
                  }}
                >
                  <FaPhoneAlt />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Phone Support
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    +880 1643 530 690
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" gap={2}>
                <Box
                  sx={{
                    color: "#00CA52",
                    fontSize: "1.2rem",
                    mt: 0.5,
                  }}
                >
                  <FaEnvelope />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Email Address
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    alamincse44@gmail.com
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.05)" }} />

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" sx={{ color: "#666" }}>
            © {new Date().getFullYear()} Rehan Bike Shop. All Rights Reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" sx={{ color: "#666" }}>
              Developed by Al Amin
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
