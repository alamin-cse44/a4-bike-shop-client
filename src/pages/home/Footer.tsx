import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" bgcolor="background.paper" color="text.secondary" py={4} mt={10}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Image
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Information
          </Typography>
          <Box>
            <MuiLink component={Link} to="/github" color="inherit" underline="hover">
              Github
            </MuiLink>
          </Box>
          <Box>
            <MuiLink component={Link} to="/discord" color="inherit" underline="hover">
              Discord
            </MuiLink>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Box>
            <MuiLink component={Link} to="/privacy-policy" color="inherit" underline="hover">
              Privacy Policy
            </MuiLink>
          </Box>
          <Box>
            <MuiLink component={Link} to="/terms-conditions" color="inherit" underline="hover">
              Terms & Conditions
            </MuiLink>
          </Box>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          © 2025 Rehan. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;