import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            mb: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "8rem", md: "12rem" },
              fontWeight: 900,
              color: "rgba(0, 202, 82, 0.1)",
              lineHeight: 1,
            }}
          >
            404
          </Typography>
          <DirectionsBikeIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: { xs: "4rem", md: "6rem" },
              color: "primary.main",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          You've Ridden Off the Trail!
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", maxWidth: "500px" }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </Typography>

        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 4px 14px 0 rgba(0, 202, 82, 0.39)",
            }}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
